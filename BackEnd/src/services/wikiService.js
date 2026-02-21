const axios = require("axios");
const cheerio = require("cheerio");
const Document = require("../models/document");

/*
  1. Takes a search term
  2. Fetches Wikipedia summary 
  3. Fetches full HTML page
  4. Extracts clean paragraph text
  5. Saves to MongoDB
*/

const crawlFullWikiPage = async (searchTerm) => {
  try {

    // Replace spaces with underscore for wiki URL format
    const formattedTerm = searchTerm.replace(/\s+/g, "_");

    // Step 1: Get summary API to retrieve official page URL
    const summaryResponse = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTerm}`,
      {
        headers: {
          "User-Agent": "ZoloSearchEngine/1.0"
        }
      }
    );

    const pageUrl = summaryResponse.data.content_urls.desktop.page;
    const pageTitle = summaryResponse.data.title;

    console.log("Summary fetched:", pageTitle);

    // Fetch full HTML page
    const { data: html } = await axios.get(pageUrl, {
      headers: {
        "User-Agent": "ZoloSearchEngine/1.0"
      }
    });

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Remove unnecessary elements 
    $("script, style, table, sup").remove();

    /*
      Wikipedia main content is inside
      #mw-content-text
    */
    const paragraphs = $("#mw-content-text p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ");

    // Basic cleaning 
    const cleanedText = paragraphs.replace(/\s+/g, " ").trim();

    console.log("Extracted text length:", cleanedText.length);

    // Check if document already exists
    const existing = await Document.findOne({ url: pageUrl });

    if (existing) {
      console.log("Document already exists in DB.");
      return existing;
    }

    // Save new document in DB
    const newDoc = new Document({
      title: pageTitle,
      content: cleanedText,
      source: "Wikipedia",
      url: pageUrl
    });

    await newDoc.save();

    console.log("Document saved successfully.");

    return newDoc;

  } catch (error) {
    console.error("Error in crawlFullWikiPage:", error.message);
    throw error;
  }
};

module.exports = { crawlFullWikiPage };