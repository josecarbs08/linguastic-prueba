const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

console.log($('.nav-dropdown-trigger').filter((i, el) => $(el).text().includes('Programas')).next('.mega-dropdown').html());
