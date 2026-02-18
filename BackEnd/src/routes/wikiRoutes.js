const express = require('express');
const {fetchWikiPage}=require("../services/wikiService")

const router = express.Router();
router.get("/crawl/:term", async (req, res) => {
  const result = await fetchWikiPage(req.params.term);
  res.json(result);
});
module.exports = router;

