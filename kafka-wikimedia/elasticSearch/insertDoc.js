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
    body.push({ index: { _index: indexName, _id: document.meta.id } });
    body.push(document);
  });

  return esClient.bulk({ body });
};

module.exports = { insertDoc, insertBulkWiki };
