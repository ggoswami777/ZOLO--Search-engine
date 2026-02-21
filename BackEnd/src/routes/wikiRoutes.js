const express = require("express");
const { crawlFullWikiPage } = require("../services/wikiService");
const router = express.Router();
const Document=require("../models/document")
const { searchDocuments } = require("../services/searchService");
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);
    let results = await searchDocuments(query);
    const exactMatch = await Document.findOne({
      title: new RegExp(`^${query}$`, "i"),
    });
    if (!exactMatch) {
      console.log("Exact page not found. Crawling...");
      await crawlFullWikiPage(query);
      results = await searchDocuments(query);
    }
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});
router.get("/crawl/:term", async (req, res) => {
  try {
    const result = await crawlFullWikiPage(req.params.term);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to crawl page" });
  }
});
module.exports = router;
