const express = require('express');
const {crawlFullWikiPage}=require("../services/wikiService")
const router = express.Router();

router.get("/crawl/:term", async (req, res) => {
  try {
    const result = await crawlFullWikiPage(req.params.term);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to crawl page" });
  }
});

module.exports = router;

