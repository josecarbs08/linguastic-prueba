const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Fix encoding issues in the title
html = html.replace('Programas de InglAcs', 'Programas de Inglés');
html = html.replace('inglAcs', 'inglés');
html = html.replace('tecnologA-a', 'tecnología');
html = html.replace('InglAcs', 'Inglés');
html = html.replace('FrancAcs', 'Francés');
html = html.replace('AlemA!n', 'Alemán');

fs.writeFileSync('index.html', html, 'utf-8');
