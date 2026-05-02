const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(content);
console.log("index.html nav text includes Escuela:", $('nav').text().includes('Escuela'));

const contentOrig = fs.readFileSync('index_orig.html', 'utf-8');
const $orig = cheerio.load(contentOrig);
console.log("index_orig.html nav text includes Escuela:", $orig('nav').text().includes('Escuela'));

const files = fs.readdirSync('.');
files.forEach(f => {
    if(f.endsWith('.html')) {
        const c = fs.readFileSync(f, 'utf-8');
        if (c.includes('mega')) {
            console.log(`${f} contains mega`);
        }
    }
});
