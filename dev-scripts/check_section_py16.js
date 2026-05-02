const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

console.log("Section py-16 content:");
console.log($('section.py-16').html().substring(0, 1000));

console.log("Section languages title:");
console.log($('#languages').find('h2').text());
