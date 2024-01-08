const esClient = require("./client");
const createIndex = async (indexName) => {
  return await esClient.indices.create({
    index: indexName,
  });
};

module.exports = createIndex;
