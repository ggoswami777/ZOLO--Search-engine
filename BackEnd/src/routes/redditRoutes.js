// routes/searchReddit.js
const express = require("express");
const router = express.Router();
const { crawlRedditPosts } = require("../services/redditService");
const index = require("../config/searchIndex");
const Document = require("../models/document");

// GET /api/searchReddit?q=async&subreddit=javascript&limit=10
router.get("/", async (req, res) => {
  const query = req.query.q || "";        // search query from frontend
  const subreddit = req.query.subreddit || "javascript";
  const limit = parseInt(req.query.limit) || 5;

  try {
    // 1️⃣ Crawl latest Reddit posts from subreddit
    await crawlRedditPosts(subreddit, limit);

    // 2️⃣ Search all indexed documents
    let resultIds = [];
    if (query) {
      resultIds = index.search(query); // returns array of _id strings
    } else {
      // if no query, return latest Reddit posts only
      const latestPosts = await Document.find({ source: "Reddit", subreddit })
        .sort({ createdAt: -1 })
        .limit(limit);
      return res.json(latestPosts);
    }

    // 3️⃣ Fetch full documents from MongoDB
    const documents = await Document.find({ _id: { $in: resultIds } });

    res.json(documents);
  } catch (err) {
    console.error("searchReddit route error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;