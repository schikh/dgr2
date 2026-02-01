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
  context.log('Goods function processed a request.');

  try {
    const container = getContainer();

    if (req.method === 'GET') {
      const { resources } = await container.items
        .query('SELECT c.goods FROM c WHERE c.type = "data"')
        .fetchAll();

      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: resources.length > 0 ? resources[0].goods || [] : []
      };
    } else if (req.method === 'PUT') {
      const { goods } = req.body;

      if (!Array.isArray(goods)) {
        context.res = {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: { error: 'goods must be an array' }
        };
        return;
      }

      const { resources } = await container.items
        .query('SELECT * FROM c WHERE c.type = "data"')
        .fetchAll();

      if (resources.length === 0) {
        context.res = {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: { error: 'Data document not found' }
        };
        return;
      }

      const existingDoc = resources[0];
      const updatedDoc = {
        ...existingDoc,
        goods,
        updatedAt: new Date().toISOString()
      };

      const result = await container.item(existingDoc.id, existingDoc.type).replace(updatedDoc);
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: result.resource
      };
    }
  } catch (error) {
    context.log.error('Error processing goods:', error);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Failed to process goods', message: error.message }
    };
  }
};
