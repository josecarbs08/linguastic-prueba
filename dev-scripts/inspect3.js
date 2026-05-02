const fs = require('fs');
const cheerio = require('cheerio');

const origHtml = fs.readFileSync('index_orig.html', 'utf-8');
const orig$ = cheerio.load(origHtml);

orig$('section').each((i, el) => {
    console.log(`\n--- Section ${i} ---`);
    console.log(orig$(el).text().trim().substring(0, 100));
});
