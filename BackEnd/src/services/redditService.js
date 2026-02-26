// services/redditService.js
const axios = require("axios");
const Document = require("../models/document");
const { processText } = require("../utils/textProcessor");
const index = require("../config/searchIndex");

const crawlRedditPosts = async (subreddit, limit = 10) => {
  try {
    const { data } = await axios.get(
      `https://www.reddit.com/r/${subreddit}/hot.json`,
      { headers: { "User-Agent": "ZoloSearchEngine/1.0" }, params: { limit } }
    );

    const posts = data.data.children;
    const results = [];

    for (const postData of posts) {
      const post = postData.data;
      const content = `${post.title} ${post.selftext || ""}`.replace(/\s+/g, " ").trim();
      if (!content) continue;

      const existing = await Document.findOne({ url: post.url });
      if (existing) { results.push(existing); continue; }

      const tokens = processText(content);

      const newDoc = new Document({
        title: post.title,
        content,
        source: "Reddit",  // save source
        subreddit,         // save subreddit
        url: post.url,
        tokens,
      });

      await newDoc.save();
      index.add(newDoc._id.toString(), tokens.join(" "));
      results.push(newDoc);
    }

    return results;
  } catch (error) {
    console.error("redditService error:", error.message);
    throw error;
  }
};

module.exports = { crawlRedditPosts };