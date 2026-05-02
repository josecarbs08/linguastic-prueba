const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(content);
$('section').each((i, el) => {
    console.log(`${i}: id=${$(el).attr('id')} -> ${$(el).find('h1, h2, h3').first().text().replace(/\s+/g, ' ').trim()}`);
});
