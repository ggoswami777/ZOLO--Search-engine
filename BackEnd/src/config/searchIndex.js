const { Index } = require("flexsearch");


const index = new Index({
  tokenize: "forward",
  cache: true,
  resolution: 9
});

module.exports = index;