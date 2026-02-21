const Document = require("../models/document");
const index = require("../config/searchIndex");

const rebuildIndex = async () => {
  const docs = await Document.find();

  docs.forEach(doc => {
    index.add(doc._id.toString(), doc.tokens.join(" "));
  });

  console.log("Search index rebuilt.");
};

module.exports = rebuildIndex;