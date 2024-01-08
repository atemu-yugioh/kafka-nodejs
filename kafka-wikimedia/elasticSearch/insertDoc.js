const esClient = require("./client");
const insertDoc = function (indexName, _id, data) {
  return esClient.index({
    index: indexName,
    id: _id,
    body: data,
  });
};

const insertBulkWiki = (indexName, documents) => {
  const body = [];

  // Duyệt qua mảng tài liệu và thêm các lệnh index và tài liệu vào body
  documents.forEach((document) => {
    body.push({ index: { _index: indexName } });
    body.push(document);
  });

  const response = esClient.bulk({ body });

  return response;
};

module.exports = { insertDoc, insertBulkWiki };
