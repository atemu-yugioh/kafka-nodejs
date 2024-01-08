const esClient = require("./client");

esClient
  .ping({
    requestTimeout: 3000,
  })
  .then(() => console.log(`connect success`))
  .catch(() => console("Elasticsearch cluster is down"));
