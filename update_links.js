const fs = require('fs');
const glob = require('glob');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace Programas menu links
    content = content.replace(/href="#languages"/g, 'href="programas.html"');
    
    // Wait, the dropdown inside Programas might need specific links if on the same page.
    // Let's just point them to programas.html#languages for simplicity, or just programas.html
    // Actually, "href=\"#languages\"" => "href=\"programas.html\""
    
    // Replace Clases menu links
    content = content.replace(/href="#clases"/g, 'href="clases.html"');
    
    // Fix Certifications link
    content = content.replace(/href="#certifications"/g, 'href="programas.html#certifications"');
    
    // Fix Noticias if on a different page (not index.html)
    if (file !== 'index.html') {
        content = content.replace(/href="#noticias"/g, 'href="index.html#noticias"');
        content = content.replace(/href="#faq"/g, 'href="index.html#faq"');
        content = content.replace(/href="#home"/g, 'href="index.html"');
    }
    
    fs.writeFileSync(file, content, 'utf-8');
});

console.log('Links updated');
