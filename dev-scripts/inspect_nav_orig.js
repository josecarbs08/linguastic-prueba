const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index_orig.html', 'utf-8');
const $ = cheerio.load(content);
console.log($('nav').html());
