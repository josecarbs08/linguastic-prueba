const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The "Course 2" and "Course 3" cards
html = html.replace(/<h3 class="text-3xl font-semibold text-on-surface mb-2 tracking-tight font-label">Francés<\/h3>/g, '<h3 class="text-3xl font-semibold text-on-surface mb-2 tracking-tight font-label">Business English</h3>');
html = html.replace(/<p class="text-on-surface-variant font-semibold mb-8 opacity-80">Domina el idioma del amor y los\s*negocios desde la primera semana\.<\/p>/g, '<p class="text-on-surface-variant font-semibold mb-8 opacity-80">Aprende jugando con nuestra metodología lúdica especializada para niños y adolescentes.</p>');
html = html.replace(/data-curso="Francés"/g, 'data-curso="Business and Teens"');
html = html.replace(/langSelect.value = 'Francés';/g, "langSelect.value = 'Business and Teens';");

html = html.replace(/<h3 class="text-3xl font-semibold text-on-surface mb-2 tracking-tight font-label">Alemán<\/h3>/g, '<h3 class="text-3xl font-semibold text-on-surface mb-2 tracking-tight font-label">Certificaciones</h3>');
html = html.replace(/<p class="text-on-surface-variant font-semibold mb-8 opacity-80">Abre las puertas de la ingeniería y\s*ciencia en Europa\.<\/p>/g, '<p class="text-on-surface-variant font-semibold mb-8 opacity-80">Prepárate para TOEFL y Cambridge con nuestros expertos y alcanza tus metas.</p>');
html = html.replace(/data-curso="Alemán"/g, 'data-curso="Certificaciones"');
html = html.replace(/langSelect.value = 'Alemán';/g, "langSelect.value = 'Certificaciones';");

// Make sure Ingles has data-curso="Inglés General"
html = html.replace(/data-curso="Inglés"/g, 'data-curso="Inglés General"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed additional French/German references.');
