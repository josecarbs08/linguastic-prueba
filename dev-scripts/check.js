const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('Title changed:', html.includes('<title>Lingüastic | Escuela Especializada en Inglés en Tehuacán</title>'));
console.log('Why index:', html.indexOf('id="why"'));
console.log('Languages index:', html.indexOf('id="languages"'));
console.log('Why before Languages:', html.indexOf('id="why"') < html.indexOf('id="languages"'));
console.log('Business and Teens data:', html.includes('data-curso="Business and Teens"'));
console.log('Ingles general nav:', html.includes('Inglés General'));
