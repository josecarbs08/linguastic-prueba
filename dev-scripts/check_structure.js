const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const cheerio = require('cheerio');
const $ = cheerio.load(html);

const sectionIds = [];
$('section').each((i, el) => {
    sectionIds.push($(el).attr('id') || $(el).attr('class') || 'unnamed-section');
});
console.log("Sections in order:", sectionIds);

// check nav for mega-dropdown
console.log("Nav HTML:");
console.log($('nav.glass-nav').html().substring(0, 1000));
