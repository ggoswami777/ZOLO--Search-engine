const Document = require("../models/document");
const { processText } = require("../utils/textProcessor");
const index = require("../config/searchIndex");

const searchDocuments = async (query) => {
  if (!query) return [];
  const processedQuery = processText(query).join(" ");
  const resultIds = index.search(processedQuery);
  console.log("Processed Query:", processedQuery);
  console.log("Index Results:", resultIds);

  if (!resultIds || resultIds.length === 0) return [];
  const docs = await Document.find({
    _id: { $in: resultIds }
  });

  const orderedDocs = resultIds.map(id =>
    docs.find(doc => doc._id.toString() === id)
  );
  return orderedDocs.filter(Boolean).map(doc => ({
    _id: doc._id,
    title: doc.title,
    url: doc.url
  }));
};

module.exports = { searchDocuments };