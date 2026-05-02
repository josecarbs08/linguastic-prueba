const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(content);

// The user provided the "noticias" section HTML snippet:
const noticiasHtml = `
<section id="noticias" class="py-24 relative overflow-hidden">
            <!-- Decorative blobs -->
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="absolute top-[15%] right-[-8%] w-[450px] h-[450px] bg-primary/8 rounded-full filter blur-[100px] animate-pulse" style="animation-delay: 1s;"></div>
                <div class="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-secondary/10 rounded-full filter blur-[80px] animate-pulse" style="animation-delay: 3s;"></div>
            </div>

            <div class="max-w-7xl mx-auto relative z-10 px-6">
                <!-- Header with nav arrows -->
                <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                    <div class="space-y-4">
                        <div class="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-black tracking-widest uppercase">
                            <span class="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                            Lo último
                        </div>
                        <h2 class="text-5xl lg:text-7xl font-black text-primary tracking-tighter leading-none">Novedades</h2>
                        <p class="text-xl text-on-surface-variant font-medium">Entérate de lo que está pasando en Lingüastic.</p>
                    </div>
                    <!-- Navigation Arrows -->
                    <div class="flex items-center gap-3">
                        <button id="noticias-prev" class="noticias-nav-btn w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Anterior">
                            <span translate="no" class="material-symbols-outlined text-2xl">chevron_left</span>
                        </button>
                        <button id="noticias-next" class="noticias-nav-btn w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Siguiente">
                            <span translate="no" class="material-symbols-outlined text-2xl">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Carousel (full-bleed, scrolls past container) -->
            <div class="w-full relative z-10">
                <div id="noticias-grid" class="noticias-carousel flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar" style="padding-left: max(1.5rem, 50% - 640px + 1.5rem); padding-right: max(1.5rem, 50% - 640px + 1.5rem); scroll-behavior: smooth;">
                    <a href="/noticia?id=nuevo-grupo-ingles-abril-2026" class="news-card group cursor-pointer shrink-0 w-[85vw] sm:w-[380px] snap-center bg-white rounded-3xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden" id="news-nuevo-grupo-ingles-abril-2026" draggable="false">
                        <div class="overflow-hidden relative h-48">
                            <img src="assets/noticia-nuevo-grupo.png" alt="Inglés Principiante — Sábados" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" draggable="false">
                            <div class="absolute top-4 left-4 z-10">
                                <span class="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Nuevo grupo</span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-[11px] font-bold text-on-surface-variant/40 tracking-wider uppercase mb-2">25 Abril, 2026</span>
                            <h3 class="text-xl font-black text-on-surface mb-3 tracking-tight leading-tight">Inglés Principiante — Sábados</h3>
                            <p class="text-on-surface-variant font-medium leading-relaxed text-sm line-clamp-3 mb-6">¡Abrimos un nuevo grupo de inglés desde cero! Sábados intensivos de 09:00 a 13:00 hrs. Cupo limitado para garantizar atención personalizada.</p>
                            <span class="mt-auto flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Leer más
                                <span translate="no" class="material-symbols-outlined text-base">arrow_forward</span>
                            </span>
                        </div>
                    </a>
                
                    <a href="/noticia?id=club-conversacion-internacional" class="news-card group cursor-pointer shrink-0 w-[85vw] sm:w-[380px] snap-center bg-white rounded-3xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden" id="news-club-conversacion-internacional" draggable="false">
                        <div class="overflow-hidden relative h-48">
                            <img src="assets/noticia-club-conversacion.png" alt="Club de Conversación Especial" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" draggable="false">
                            <div class="absolute top-4 left-4 z-10">
                                <span class="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Evento</span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-[11px] font-bold text-on-surface-variant/40 tracking-wider uppercase mb-2">Mayo 2026</span>
                            <h3 class="text-xl font-black text-on-surface mb-3 tracking-tight leading-tight">Club de Conversación Especial</h3>
                            <p class="text-on-surface-variant font-medium leading-relaxed text-sm line-clamp-3 mb-6">Invitados internacionales se unen al club. ¡Practica con hablantes nativos en un ambiente relajado!</p>
                            <span class="mt-auto flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Leer más
                                <span translate="no" class="material-symbols-outlined text-base">arrow_forward</span>
                            </span>
                        </div>
                    </a>
                
                    <a href="/noticia?id=inscripciones-abiertas-2026" class="news-card group cursor-pointer shrink-0 w-[85vw] sm:w-[380px] snap-center bg-white rounded-3xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden" id="news-inscripciones-abiertas-2026" draggable="false">
                        <div class="overflow-hidden relative h-48">
                            <img src="assets/noticia-inscripciones.png" alt="Inscripciones Abiertas" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" draggable="false">
                            <div class="absolute top-4 left-4 z-10">
                                <span class="bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Aviso</span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-[11px] font-bold text-on-surface-variant/40 tracking-wider uppercase mb-2">Abril 2026</span>
                            <h3 class="text-xl font-black text-on-surface mb-3 tracking-tight leading-tight">Inscripciones Abiertas</h3>
                            <p class="text-on-surface-variant font-medium leading-relaxed text-sm line-clamp-3 mb-6">Aprovecha la tarifa preferencial de apertura para todos nuestros programas de inglés.</p>
                            <span class="mt-auto flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Leer más
                                <span translate="no" class="material-symbols-outlined text-base">arrow_forward</span>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
`;

// Extract sections
const sections = $('main').children('section, div').toArray();
const bodyDirectSections = $('body > section').toArray(); // sometimes sections are directly in body

// We will detach all top-level sections (inside main or body) to reorder them
$('main').empty();
const allSections = [];

$('body > section').each((i, el) => {
    if($(el).attr('id') !== 'noticias') { // avoid any duplicates
        allSections.push(el);
        $(el).detach();
    }
});

$('body > div').each((i, el) => {
    // Keep modals and navs, but check if any section-like divs exist
    const id = $(el).attr('id');
    if (id === 'mobile-menu' || id === 'registration-modal') return; 
});

// Build the array based on id or content:
const map = {};
sections.forEach(el => {
    const id = $(el).attr('id');
    if(id) {
        map[id] = el;
    } else {
        // use header to identify
        const header = $(el).find('h1, h2, h3').first().text().replace(/\\s+/g, ' ').trim();
        if(header.includes('Hablar otro idioma')) map['oportunidades'] = el;
        else if(header.includes('Clases para jóvenes')) map['banner-jovenes'] = el;
        else map['unknown_' + Math.random()] = el;
    }
});
allSections.forEach(el => {
    const id = $(el).attr('id');
    if(id) map[id] = el;
});

// Desired order:
// 1. Hero
// 2. Nuestras Clases / Metodología ('clases', 'oportunidades', 'why')
// 3. Cursos (slider - 'languages') + 'certifications' + 'opening-courses' maybe?
// 4. Noticias (insert HTML)
// 5. Reseñas
// 6. FAQ
// 7. Ubicación

const finalOrderIds = [
    'hero',
    'why',
    'oportunidades',
    'clases',
    'languages',
    'opening-courses',
    'certifications',
    'noticias',
    'reviews',
    'banner-jovenes',
    'faq',
    'location'
];

finalOrderIds.forEach(id => {
    if (id === 'noticias') {
        $('main').append(noticiasHtml);
    } else if (map[id]) {
        $('main').append(map[id]);
        delete map[id]; // mark as used
    }
});

// Append any unused sections at the end just in case
Object.values(map).forEach(el => {
    $('main').append(el);
});

// FIX NAV:
const newNav = \`
        <div class="flex flex-1 flex-row items-center px-8 py-3 max-w-7xl mx-auto w-full">
            <!-- Logo - Start -->
            <div class="flex-1 flex justify-start">
                <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center p-0.5 overflow-hidden ring-4 ring-primary/10 select-none cursor-pointer" onclick="window.location.href='#home'">
                    <img src="assets/linguastic.jpg" alt="Lingüastic - Escuela de Idiomas en Tehuacán" class="w-full h-full object-cover rounded-full" fetchpriority="high" loading="eager">
                </div>
            </div>

            <!-- Desktop Links - Center -->
            <div class="hidden lg:flex flex-none items-center justify-center gap-8 font-black text-sm tracking-wide">
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300" href="#home">Inicio</a>
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300" href="#clases">Metodología</a>
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300" href="#languages">Programas</a>
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300" href="#noticias">Noticias</a>
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300" href="#faq">Preguntas</a>
            </div>

            <!-- Right Side: Registration + Mobile Toggle -->
            <div class="flex-1 flex items-center justify-end gap-6">
                <!-- Registration Button -->
                <button class="open-registration hidden sm:block signature-gradient text-white px-8 py-2.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 duration-300">
                    Registro
                </button>

                <!-- Mobile Toggle -->
                <button id="mobile-menu-toggle" class="lg:hidden w-10 h-10 flex items-center justify-center text-primary" aria-label="Abrir menú">
                    <span translate="no" class="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>
        </div>
\`;
$('nav').html(newNav);

fs.writeFileSync('index.html', $.html());
console.log('Restructured successfully');
