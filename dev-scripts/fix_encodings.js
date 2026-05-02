const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/InglAcs/g, 'Inglés');
html = html.replace(/FrancAcs/g, 'Francés');
html = html.replace(/AlemA!n/g, 'Alemán');
html = html.replace(/AlemA\?n/g, 'Alemán');
html = html.replace(/metodologAa/g, 'metodología');
html = html.replace(/Anica/g, 'única');
html = html.replace(/TehuacAn/g, 'Tehuacán');
html = html.replace(/A/g, 'ü');
html = html.replace(/Lingüastic/g, 'Lingüastic');
html = html.replace(/LingAastic/g, 'Lingüastic');
html = html.replace(/A3/g, 'ó');
html = html.replace(/A-a/g, 'ía');
html = html.replace(/A!/g, 'á');
html = html.replace(/A?/g, 'á'); // wait, careful with regex

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Fixed encodings directly');