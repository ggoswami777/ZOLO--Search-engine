const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  source: String,
  url: { type: String, unique: true },
  tokens: [String],  
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
