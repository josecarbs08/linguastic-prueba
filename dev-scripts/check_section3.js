const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

console.log("Section 3 content:");
console.log($('section.py-32').html().substring(0, 1000));
