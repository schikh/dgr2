const { CosmosClient } = require('@azure/cosmos');

let cosmosClient = null;
let container = null;

function getContainer() {
  if (!container) {
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = process.env.COSMOS_DATABASE_ID;
    const containerId = process.env.COSMOS_CONTAINER_ID;

    if (!key || !endpoint || !databaseId || !containerId) {
      throw new Error('Missing required Cosmos DB configuration');
    }

    cosmosClient = new CosmosClient({ endpoint, key });
    const database = cosmosClient.database(databaseId);
    container = database.container(containerId);
  }
  return container;
}

module.exports = async function (context, req) {
  context.log('Data function processed a request.');

  try {
    const container = getContainer();

    if (req.method === 'GET') {
      // Query all three documents in parallel
      const [companiesResult, goodsResult, exclusionsResult] = await Promise.all([
        container.items.query('SELECT c.list FROM c WHERE c.id = "companies"').fetchAll(),
        container.items.query('SELECT c.list FROM c WHERE c.id = "goods"').fetchAll(),
        container.items.query('SELECT c.list FROM c WHERE c.id = "exclusions"').fetchAll()
      ]);

      const dataFile = {
        companies: companiesResult.resources.length > 0 ? companiesResult.resources[0].list || [] : [],
        goods: goodsResult.resources.length > 0 ? goodsResult.resources[0].list || [] : [],
        exclusions: exclusionsResult.resources.length > 0 ? exclusionsResult.resources[0].list || [] : []
      };

      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: dataFile
      };
    } else if (req.method === 'PUT') {
      const { companies, goods, exclusions } = req.body;

      // Update all three documents in parallel
      const updates = [];

      if (companies !== undefined) {
        const { resources } = await container.items.query('SELECT * FROM c WHERE c.id = "companies"').fetchAll();
        if (resources.length > 0) {
          const doc = { ...resources[0], list: companies, updatedAt: new Date().toISOString() };
          updates.push(container.item(doc.id, doc.id).replace(doc));
        }
      }

      if (goods !== undefined) {
        const { resources } = await container.items.query('SELECT * FROM c WHERE c.id = "goods"').fetchAll();
        if (resources.length > 0) {
          const doc = { ...resources[0], list: goods, updatedAt: new Date().toISOString() };
          updates.push(container.item(doc.id, doc.id).replace(doc));
        }
      }

      if (exclusions !== undefined) {
        const { resources } = await container.items.query('SELECT * FROM c WHERE c.id = "exclusions"').fetchAll();
        if (resources.length > 0) {
          const doc = { ...resources[0], list: exclusions, updatedAt: new Date().toISOString() };
          updates.push(container.item(doc.id, doc.id).replace(doc));
        }
      }

      await Promise.all(updates);

      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { success: true, message: 'Data updated successfully' }
      };
    }
  } catch (error) {
    context.log.error('Error processing data:', error);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Failed to process data', message: error.message }
    };
  }
};
