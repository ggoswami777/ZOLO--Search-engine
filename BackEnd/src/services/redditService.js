const axios = require("axios");
const Document = require("../models/document");
const { processText } = require("../utils/textProcessor");
const index = require("../config/searchIndex");

/*
  1. Takes a subreddit and limit
  2. Fetches top posts from Reddit JSON API
  3. Cleans and processes text
  4. Saves to MongoDB
  5. Indexes for search engine
*/

const crawlRedditPosts = async (subreddit, limit = 10) => {
  try {
    console.log(`Fetching posts from /r/${subreddit} ...`);

    // Fetch posts from Reddit public JSON API
    const { data } = await axios.get(
      `https://www.reddit.com/r/${subreddit}/hot.json`,
      {
        headers: { "User-Agent": "ZoloSearchEngine/1.0" },
        params: { limit },
      }
    );

    const posts = data.data.children;
    const results = [];

    for (const postData of posts) {
      const post = postData.data;

      // Combine title + selftext
      const content = `${post.title} ${post.selftext || ""}`
        .replace(/\s+/g, " ")
        .trim();

      if (!content) continue;

      // Check if document already exists
      const existing = await Document.findOne({ url: post.url });
      if (existing) {
        results.push(existing);
        continue;
      }

      const tokens = processText(content);

      const newDoc = new Document({
        title: post.title,
        content,
        source: "Reddit",
        url: post.url,
        tokens,
      });

      await newDoc.save();
      index.add(newDoc._id.toString(), tokens.join(" "));
      results.push(newDoc);

      console.log("Saved & indexed:", post.title);
    }

    return results;
  } catch (error) {
    console.error("redditService error:", error.message);
    throw error;
  }
};

module.exports = { crawlRedditPosts };