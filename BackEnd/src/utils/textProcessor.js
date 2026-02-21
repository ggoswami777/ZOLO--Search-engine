const natural=require("natural");
const sw=require("stopword");
// extract tokenized words from text
const processText=(text)=>{
    const lowerText=text.toLowerCase();
    const cleanedText = lowerText.replace(/[^a-z\s]/g, " ");
    const tokenizer=new natural.WordTokenizer();
    const words=tokenizer.tokenize(cleanedText);
    // remove stop words extra words remove krega jese 'is,the,like,of'
    const filteredWords=sw.removeStopwords(words);
    // stem krega words ko jese running=>run,going=>go
    const stemmedWords=filteredWords.map(word=>natural.PorterStemmer.stem(word));
    return stemmedWords;
}
module.exports={processText};