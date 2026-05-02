const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

function extractSection(html, id) {
    const startIndex = html.indexOf(`<section id="${id}"`);
    if (startIndex === -1) return null;
    let openTags = 0;
    let currentIndex = startIndex;
    while (currentIndex < html.length) {
        if (html.startsWith('<section', currentIndex)) openTags++;
        else if (html.startsWith('</section>', currentIndex)) {
            openTags--;
            if (openTags === 0) {
                return html.substring(startIndex, currentIndex + 10);
            }
        }
        currentIndex++;
    }
    return null;
}

const clasesSec = extractSection(html, 'clases');
const languagesSec = extractSection(html, 'languages');
const openingCoursesSec = extractSection(html, 'opening-courses');

let indexHtml = html;
if (clasesSec) indexHtml = indexHtml.replace(clasesSec, '');
if (languagesSec) indexHtml = indexHtml.replace(languagesSec, '');
if (openingCoursesSec) indexHtml = indexHtml.replace(openingCoursesSec, '');

fs.writeFileSync('index.html', indexHtml, 'utf-8');

function keepSections(filePath, sectionsToKeep) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const allSections = ['hero', 'why', 'clases', 'languages', 'noticias', 'opening-courses', 'faq', 'reviews'];
    
    allSections.forEach(secId => {
        if (!sectionsToKeep.includes(secId)) {
            const secContent = extractSection(content, secId);
            if (secContent) {
                content = content.replace(secContent, '');
            }
        }
    });
    
    // update page titles
    if (filePath === 'programas.html') {
        content = content.replace('<title>Lingüastic | Escuela Especializada en Inglés en Tehuacán</title>', '<title>Programas | Lingüastic</title>');
    } else if (filePath === 'clases.html') {
        content = content.replace('<title>Lingüastic | Escuela Especializada en Inglés en Tehuacán</title>', '<title>Nuestras Clases | Lingüastic</title>');
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
}

keepSections('programas.html', ['languages', 'opening-courses']);
keepSections('clases.html', ['clases']);

console.log('Extraction complete');
