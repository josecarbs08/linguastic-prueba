const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Move #noticias right after #languages
const noticiasSectionHTML = $('#noticias').parent().html() ? $.html($('#noticias')) : '';
if (noticiasSectionHTML) {
    $('#noticias').remove();
    $('#languages').after(noticiasSectionHTML);
}

// 2. Add specific CSS class if needed to avoid off-screen overflow
const dropdownCSS = `
<style id="dropdown-fix-css">
/* Redesigned Dropdown matching the screenshot */
.mega-dropdown-inner {
    background: #ffffff;
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.05);
    width: 380px; /* Slightly wider to fit the text comfortably */
    position: relative;
}

/* Fix positioning to prevent overflowing the screen */
.nav-item-with-dropdown {
    position: relative;
}

.mega-dropdown {
    position: absolute;
    top: 100%;
    /* Align it closely to the left to avoid it running off screen on small windows */
    left: 0;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 1rem;
    z-index: 100;
}

.nav-item-with-dropdown:hover .mega-dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.lang-dropdown-card {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.75rem;
    border-radius: 1rem;
    transition: background-color 0.2s;
    text-decoration: none;
}
.lang-dropdown-card:hover {
    background-color: #f8fafc;
}
.lang-icon-text {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 900;
    font-size: 1.1rem;
    color: #1e293b;
}

/* Exact background colors from the screenshot for icons */
.bg-gb { background-color: #eef5fd; }
.bg-fr { background-color: #f1f8fc; }
.bg-de { background-color: #fdf7e7; }

.dropdown-header-title {
    font-size: 0.75rem;
    font-weight: 800;
    color: #b19db5; /* Muted purple color from image */
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    padding-left: 0.75rem;
}
.lang-title-text {
    font-weight: 800;
    color: #33213a;
    font-size: 0.95rem;
    margin-bottom: 0.1rem;
}
.lang-subtitle-text {
    font-size: 0.75rem;
    color: #8c7b91;
    font-weight: 500;
}

.dropdown-footer-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: #6A3093;
    padding-top: 1.5rem;
    margin-top: 0.5rem;
    padding-left: 0.75rem;
    border-top: 1px solid rgba(0,0,0,0.05);
    transition: opacity 0.2s;
    width: 100%;
}
.dropdown-footer-link:hover {
    opacity: 0.8;
}
</style>
`;

$('head').append(dropdownCSS);

// Let's replace the inner HTML of the mega-dropdown for programs
const programsDropdownHTML = '<div class="mega-dropdown-inner">' +
    '<div class="mb-2">' +
        '<p class="dropdown-header-title">PROGRAMAS QUE IMPARTIMOS</p>' +
    '</div>' +
    '<div class="grid grid-cols-1 gap-2">' +
        '<a href="#languages" class="lang-dropdown-card" data-lang="0" onclick="goToLang(0)">' +
            '<div class="lang-icon-text bg-gb">EN</div>' +
            '<div>' +
                '<p class="lang-title-text">Inglés General</p>' +
                '<p class="lang-subtitle-text">A1 a C1 · Negocios, Viajes, Académico</p>' +
            '</div>' +
        '</a>' +
        '<a href="#languages" class="lang-dropdown-card" data-lang="1" onclick="goToLang(1)">' +
            '<div class="lang-icon-text bg-fr">KT</div>' +
            '<div>' +
                '<p class="lang-title-text">Business English</p>' +
                '<p class="lang-subtitle-text">A partir de los 13 años · Divertido e Interactivo</p>' +
            '</div>' +
        '</a>' +
        '<a href="#certifications" class="lang-dropdown-card" data-lang="2" onclick="goToLang(2)">' +
            '<div class="lang-icon-text bg-de">CE</div>' +
            '<div>' +
                '<p class="lang-title-text">Certificaciones</p>' +
                '<p class="lang-subtitle-text">TOEFL, Cambridge, CENNI y más</p>' +
            '</div>' +
        '</a>' +
    '</div>' +
    '<a href="#languages" class="dropdown-footer-link" onclick="closeMenu()">' +
        'Explorar todos los programas <span translate="no" class="material-symbols-outlined" style="font-size: 1rem;">arrow_forward</span>' +
    '</a>' +
'</div>';

// Find the parent dropdown and replace its content
const navTrigger = $('.nav-dropdown-trigger').filter((i, el) => $(el).text().includes('Programas'));
if (navTrigger.length > 0) {
    navTrigger.next('.mega-dropdown').html(programsDropdownHTML);
}

// 3. Add Javascript for the Noticias carousel arrows
const jsToAdd = '<script id="noticias-carousel-js">\n' +
'document.addEventListener("DOMContentLoaded", () => {\n' +
'    const grid = document.getElementById("noticias-grid");\n' +
'    const prevBtn = document.getElementById("noticias-prev");\n' +
'    const nextBtn = document.getElementById("noticias-next");\n' +
'\n' +
'    if (grid && prevBtn && nextBtn) {\n' +
'        const scrollAmount = 380 + 24; // card width + gap (approx)\n' +
'        \n' +
'        prevBtn.addEventListener("click", () => {\n' +
'            grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });\n' +
'        });\n' +
'        \n' +
'        nextBtn.addEventListener("click", () => {\n' +
'            grid.scrollBy({ left: scrollAmount, behavior: "smooth" });\n' +
'        });\n' +
'    }\n' +
'});\n' +
'</script>';

if ($('#noticias-carousel-js').length === 0) {
    $('body').append(jsToAdd);
}

fs.writeFileSync('index.html', $.html());
console.log("Applied updates successfully.");
