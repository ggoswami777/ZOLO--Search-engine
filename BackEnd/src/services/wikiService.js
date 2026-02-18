const axios=require("axios")
const document=require("../models/document")


 const fetchWikiPage = async (searchTerm) => {
  try {
    const formattedTerm = searchTerm.replace(/\s+/g, "_");

   const response = await axios.get(
  `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTerm}`,
  {
    headers: {
      "User-Agent": "ZoloSearchEngine/1.0 (gaurav.goswami1304@gmail.com)"
    }
  }
);

    const data = response.data;

    const newDoc = new document({
      title: data.title,
      content: data.extract,
      source: "Wikipedia",
      url: data.content_urls.desktop.page,
    });

    await newDoc.save();

    console.log("Saved:", data.title);

    return newDoc;
  } catch (error) {
    console.error("Error fetching wiki:", error.message);