const fs = require('fs');
const cheerio = require('cheerio');

const origHtml = fs.readFileSync('index_orig.html', 'utf-8');
const orig$ = cheerio.load(origHtml);

orig$('section').each((i, el) => {
    console.log(`Section ${i}: id="${orig$(el).attr('id')}" class="${orig$(el).attr('class')}"`);
});
