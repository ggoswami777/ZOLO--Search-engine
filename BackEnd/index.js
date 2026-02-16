const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Svix } = require("svix");
const svix = new Svix("AUTH_TOKEN");
const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require("node-cache");
const Fuse = require("fuse.js");
const { Index } = require("flexsearch");
const sw = require('stopword');
const natural = require("natural");
require('dotenv').config();


const app = express()
const port = 3000


// Middleware
app.use(cors());
app.use(express.json());

// Cache setup
const cache = new NodeCache({ stdTTL: 600 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
