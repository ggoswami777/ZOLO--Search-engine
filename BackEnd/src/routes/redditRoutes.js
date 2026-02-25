const express = require("express");
const router = express.Router();
const { crawlRedditPosts } = require("../services/redditService");

// GET /api/reddit?subreddit=javascript&limit=10
router.get("/", async (req, res) => {
  const subreddit = req.query.subreddit || "javascript";
  const limit = parseInt(req.query.limit) || 10;

  try {
    const docs = await crawlRedditPosts(subreddit, limit);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;