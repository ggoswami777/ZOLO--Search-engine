const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const wikiRoutes=require('./src/routes/wikiRoutes')
const { Svix } = require("svix");
const svix = new Svix("AUTH_TOKEN");
const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require("node-cache");
const Fuse = require("fuse.js");
const { Index } = require("flexsearch");
const sw = require('stopword');
const natural = require("natural");
// db conncection
const connectDB = require("./src/config/db")
// auth-Route
const authRoutes = require('./src/routes/auth.routes');
const rebuildIndex = require("./src/utils/rebuildIndex");


dotenv.config();


const app = express()
const port = 3000


// database connection
connectDB();
connectDB().then(() => {
  rebuildIndex();
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}));

app.use("/api/auth" , authRoutes);
app.use("/api/wiki", wikiRoutes);


// Cache setup
const cache = new NodeCache({ stdTTL: 600 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
