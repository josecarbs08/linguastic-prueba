const fs = require('fs');

const template = fs.readFileSync('curso.html', 'utf-8');

const courses = ['ingles-basico', 'ingles-intermedio', 'ingles-avanzado', 'business-english'];

courses.forEach(c => {
    let title = c === 'business-english' ? 'Business English' : c.replace('-', ' ');
    title = title.replace(/\b\w/g, l => l.toUpperCase());

    let specificContent = template.replace(
        "const courseId = urlParams.get('id') || 'ingles-general';",
        `const courseId = '${c}'; // Hardcoded for static page`
    );

    specificContent = specificContent.replace(
        "<title>Cargando Curso... | Lingüastic</title>",
        `<title>${title} | Lingüastic</title>`
    );

    fs.writeFileSync(`${c}.html`, specificContent, 'utf-8');
});

// Update links globally
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
   let content = fs.readFileSync(file, 'utf-8');
   
   courses.forEach(c => {
       content = content.replace(new RegExp(`curso\\.html\\?id=${c}`, 'g'), `${c}.html`);
   });
   
   // also catch ingles-general if they have it
   content = content.replace(/curso\.html\?id=ingles-general/g, 'ingles-basico.html');

   fs.writeFileSync(file, content, 'utf-8');
});

console.log("Deployed physical course files and updated all links.");
