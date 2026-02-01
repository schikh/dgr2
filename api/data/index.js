const { CosmosClient } = require('@azure/cosmos');

// Cosmos DB client singleton
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
  context.log('HTTP trigger function processed a request.');

  try {
    const container = getContainer();
    const { resources } = await container.items
      .query('SELECT * FROM c WHERE c.type = "data"')
      .fetchAll();

    if (resources.length > 0) {
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: resources[0]
      };
    } else {
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { companies: [], goods: [], exclusions: [] }
      };
    }
  } catch (error) {
    context.log.error('Error fetching data:', error);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Failed to fetch data', message: error.message }
    };
  }
};
