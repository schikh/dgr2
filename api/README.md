# DGR API

Azure Functions API for managing DGR application data with Azure Cosmos DB. This API is designed to work with Azure Static Web Apps.

## Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Configure local settings:
Edit `local.settings.json` and add your Cosmos DB credentials:
- `COSMOS_ENDPOINT`: Your Cosmos DB endpoint (e.g., `https://prd.documents.azure.com:443/`)
- `COSMOS_KEY`: Your Cosmos DB primary or secondary key
- `COSMOS_DATABASE_ID`: Database name (default: `dgr2`)
- `COSMOS_CONTAINER_ID`: Container name (default: `data`)

3. Run locally with Azure Functions Core Tools:
```bash
npm start
# Or directly:
func start
```

The API will be available at `http://localhost:7071/api`

## Azure Static Web Apps Deployment

This API is designed to be deployed with Azure Static Web Apps. The functions will automatically be deployed when you push to your repository with GitHub Actions or Azure DevOps.

### Configuration in Azure Portal:
1. Set Application Settings in the Static Web App:
   - `COSMOS_ENDPOINT`
   - `COSMOS_KEY`
   - `COSMOS_DATABASE_ID`
   - `COSMOS_CONTAINER_ID`

## API Endpoints

All endpoints are prefixed with `/api`

### Data Operations
- `GET /api/data` - Get all data (companies, goods, exclusions)
- `PUT /api/data` - Update all data (not implemented in individual functions)

### Companies
- `GET /api/companies` - Get all companies
- `PUT /api/companies` - Update companies list
  - Body: `{ "companies": ["company1", "company2"] }`

### Goods
- `GET /api/goods` - Get all goods
- `PUT /api/goods` - Update goods list
  - Body: `{ "goods": ["good1", "good2"] }`

### Exclusions
- `GET /api/exclusions` - Get all exclusions
- `PUT /api/exclusions` - Update exclusions list
  - Body: `{ "exclusions": [{"company": "...", "p1": "...", "p2": "...", "text": "..."}] }`

## Data Structure

The Cosmos DB document should have the following structure:

```json
{
  "id": "data-001",
  "type": "data",
  "companies": ["company1", "company2"],
  "goods": ["good1", "good2"],
  "exclusions": [
    {
      "company": "company1",
      "p1": "good1",
      "p2": "good2",
      "text": "exclusion text"
    }
  ],
  "createdAt": "2026-02-01T00:00:00.000Z",
  "updatedAt": "2026-02-01T00:00:00.000Z"
}
```

## Example Requests

### Get all companies
```bash
curl http://localhost:7071/api/companies
```

### Update goods
```bash
curl -X PUT http://localhost:7071/api/goods \
  -H "Content-Type: application/json" \
  -d '{"goods": ["good1", "good2", "good3"]}'
```

## Project Structure

```
api/
├── host.json                 # Azure Functions host configuration
├── local.settings.json       # Local environment variables (not committed)
├── package.json              # Node.js dependencies
├── data/
│   ├── function.json        # Function binding configuration
│   └── index.js             # Function handler
├── companies/
│   ├── function.json
│   └── index.js
├── goods/
│   ├── function.json
│   └── index.js
└── exclusions/
    ├── function.json
    └── index.js
```
