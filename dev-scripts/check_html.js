const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const cheerio = require('cheerio');
const $ = cheerio.load(html);

console.log("Noticias HTML:");
console.log($('#noticias').html().substring(0, 2000));

console.log("\n\nNav Dropdowns HTML:");
console.log($('.mega-dropdown').parent().html().substring(0, 3000));
