const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(content);
console.log($('nav').html());
