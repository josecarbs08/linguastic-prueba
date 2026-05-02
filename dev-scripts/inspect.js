const fs = require('fs');
const cheerio = require('cheerio');

const origHtml = fs.readFileSync('index_orig.html', 'utf-8');
const orig$ = cheerio.load(origHtml);

const currentHtml = fs.readFileSync('index.html', 'utf-8');
const current$ = cheerio.load(currentHtml);

console.log("Orig nav length:", orig$('nav').length);
console.log("Orig noticias length:", orig$('#noticias').length);
