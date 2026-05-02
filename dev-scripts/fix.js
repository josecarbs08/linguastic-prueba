const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Metadata & SEO
html = html.replace(
    /<title>.*?<\/title>/, 
    '<title>Lingüastic | Escuela Especializada en Inglés en Tehuacán</title>'
);
html = html.replace(
    /content="Aprende inglés, francés y alemán en Lingüastic, la escuela de idiomas líder en Tehuacán.*?\"/,
    'content="Aprende inglés en Lingüastic, la escuela de idiomas líder en Tehuacán. Clases interactivas para niños, jóvenes y adultos con metodología 2026. ¡Inscríbete hoy!"'
);
html = html.replace(
    /content="Aprende inglés, francés y alemán en Lingüastic, la mejor escuela de idiomas en Tehuacán.*?\"/,
    'content="Aprende inglés en Lingüastic, la mejor escuela de idiomas en Tehuacán. Clases interactivas para niños, jóvenes y adultos. ¡Inscríbete hoy!"'
);

// 2. Navigation Menu Refactoring
html = html.replace(
    /justify-between items-center w-full px-8 py-3 max-w-7xl mx-auto/,
    'flex-1 flex justify-start items-center px-8 py-3 max-w-7xl mx-auto w-full'
);

// Desktop/Mobile buttons flex adjustment (Right side)
html = html.replace(
    /<div class="hidden md:flex items-center gap-4">/,
    '<div class="flex-1 flex justify-end items-center gap-4 hidden md:flex">'
);

// Replace "Idiomas" with "Programas"
html = html.replace(/>Idiomas</g, '>Programas<');

// Update Mega Dropdowns
const progRegex = /<!-- Mega Dropdown -->[\s\S]*?<!-- End Mega Dropdown -->/g;
const matches = html.match(progRegex);

if (matches && matches.length >= 2) {
    let newProgHtml = `<!-- Mega Dropdown -->
                        <div class="absolute left-0 mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-[#6A3093]/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                            <div class="p-3 flex flex-col gap-1">
                                <a href="#languages" class="flex items-center gap-4 p-3 hover:bg-[#FDF9FF] rounded-xl transition-colors group/item">
                                    <div class="w-10 h-10 rounded-full bg-[#FDF9FF] group-hover/item:bg-[#6A3093]/10 flex items-center justify-center text-xl transition-colors">🎓</div>
                                    <div>
                                        <div class="font-medium text-[#2d1b36]">Inglés General</div>
                                        <div class="text-xs text-[#2d1b36]/60">Adultos</div>
                                    </div>
                                </a>
                                <a href="#languages" class="flex items-center gap-4 p-3 hover:bg-[#FDF9FF] rounded-xl transition-colors group/item">
                                    <div class="w-10 h-10 rounded-full bg-[#FDF9FF] group-hover/item:bg-[#6A3093]/10 flex items-center justify-center text-xl transition-colors">🌟</div>
                                    <div>
                                        <div class="font-medium text-[#2d1b36]">Business English</div>
                                        <div class="text-xs text-[#2d1b36]/60">Niños</div>
                                    </div>
                                </a>
                                <a href="#languages" class="flex items-center gap-4 p-3 hover:bg-[#FDF9FF] rounded-xl transition-colors group/item">
                                    <div class="w-10 h-10 rounded-full bg-[#FDF9FF] group-hover/item:bg-[#6A3093]/10 flex items-center justify-center text-xl transition-colors">📝</div>
                                    <div>
                                        <div class="font-medium text-[#2d1b36]">Certificaciones</div>
                                        <div class="text-xs text-[#2d1b36]/60">TOEFL / Cambridge</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- End Mega Dropdown -->`;

    let newEscHtml = `<!-- Mega Dropdown -->
                        <div class="absolute left-0 mt-4 w-64 bg-white/95 backdrop-blur-3xl border border-[#6A3093]/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                            <div class="p-3 flex flex-col gap-1">
                                <a href="/nosotros" class="flex items-center gap-4 p-3 hover:bg-[#FDF9FF] rounded-xl transition-colors group/item">
                                    <div class="w-10 h-10 rounded-full bg-[#FDF9FF] group-hover/item:bg-[#6A3093]/10 flex items-center justify-center text-[#6A3093] transition-colors"><span class="material-symbols-rounded">group</span></div>
                                    <div>
                                        <div class="font-medium text-[#2d1b36]">Nosotros</div>
                                    </div>
                                </a>
                                <a href="#clases" class="flex items-center gap-4 p-3 hover:bg-[#FDF9FF] rounded-xl transition-colors group/item">
                                    <div class="w-10 h-10 rounded-full bg-[#FDF9FF] group-hover/item:bg-[#6A3093]/10 flex items-center justify-center text-[#6A3093] transition-colors"><span class="material-symbols-rounded">menu_book</span></div>
                                    <div>
                                        <div class="font-medium text-[#2d1b36]">Metodología</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- End Mega Dropdown -->`;

    html = html.replace(matches[0], newProgHtml);
    html = html.replace(matches[1], newEscHtml);
}

// Add direct links for "Novedades" and "Ayuda / FAQ"
html = html.replace(
    /(<div class="relative group">[\s\S]*?<!-- End Mega Dropdown -->[\s\S]*?<\/div>)/g,
    (match, p1) => {
        if (match.includes('>Escuela<')) {
            return p1 + `\n                    <a href="#noticias" class="text-[#2d1b36] hover:text-[#6A3093] font-medium nav-link">Novedades</a>
                    <a href="#faq" class="text-[#2d1b36] hover:text-[#6A3093] font-medium nav-link">Ayuda / FAQ</a>`;
        }
        return match;
    }
);

// 3. Page Structure
// Move #why before #languages
const whyRegex = /<section id="why"[\s\S]*?<\/section>\s*(?=<!--|<)/g;
const langRegex = /<section id="languages"[\s\S]*?<\/section>\s*(?=<!--|<)/g;
let whyMatch = html.match(whyRegex);
let langMatch = html.match(langRegex);

if (whyMatch && langMatch) {
    let whySection = whyMatch[0];
    let langSection = langMatch[0];

    html = html.replace(whySection, '');
    html = html.replace(langSection, whySection + '\n\n    ' + langSection);
}

// 4. Cursos Slider
html = html.replace(/>Nuestros Idiomas</g, '>Nuestros Programas de Inglés<');

html = html.replace(
    /<div class="language-slide active" data-lang="en">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="language-slide active" data-lang="en">
                        <div class="flex flex-col md:flex-row h-full">
                            <div class="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6A3093]/10 text-[#6A3093] font-semibold text-sm w-fit mb-6">
                                    <span class="material-symbols-rounded text-lg">public</span>
                                    <span>Para Adultos</span>
                                </div>
                                <h3 class="text-4xl md:text-5xl font-extrabold text-[#2d1b36] mb-6 leading-tight">Inglés <br>General</h3>
                                <p class="text-lg text-[#2d1b36]/70 mb-8 leading-relaxed font-light">
                                    Domina el inglés de forma integral. Clases dinámicas enfocadas en la comunicación fluida, preparándote para un entorno global.
                                </p>
                                <ul class="space-y-4 mb-10">
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Niveles desde A1 hasta C1</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Profesores certificados</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Club de conversación incluido</li>
                                </ul>
                                <button class="w-fit px-8 py-4 rounded-full bg-[#2d1b36] text-white font-bold hover:bg-[#6A3093] hover:shadow-lg hover:shadow-[#6A3093]/30 transition-all flex items-center gap-2 group transform hover:-translate-y-1 register-btn" data-curso="Inglés General">
                                    Inscribirme Ahora
                                    <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            <div class="md:w-1/2 bg-[#6A3093]/5 relative overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Inglés" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#6A3093]/40 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>`
);

html = html.replace(
    /<div class="language-slide" data-lang="fr">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="language-slide" data-lang="fr">
                        <div class="flex flex-col md:flex-row h-full">
                            <div class="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6A3093]/10 text-[#6A3093] font-semibold text-sm w-fit mb-6">
                                    <span class="material-symbols-rounded text-lg">child_care</span>
                                    <span>Para Niños y Adolescentes</span>
                                </div>
                                <h3 class="text-4xl md:text-5xl font-extrabold text-[#2d1b36] mb-6 leading-tight">Business & <br>Teens</h3>
                                <p class="text-lg text-[#2d1b36]/70 mb-8 leading-relaxed font-light">
                                    Aprender inglés de manera divertida. Nuestro programa está diseñado específicamente para mantener la atención y motivación de los más jóvenes.
                                </p>
                                <ul class="space-y-4 mb-10">
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Metodología lúdica</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Materiales interactivos</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Monitoreo constante</li>
                                </ul>
                                <button class="w-fit px-8 py-4 rounded-full bg-[#2d1b36] text-white font-bold hover:bg-[#6A3093] hover:shadow-lg hover:shadow-[#6A3093]/30 transition-all flex items-center gap-2 group transform hover:-translate-y-1 register-btn" data-curso="Business and Teens">
                                    Inscribir a mi hijo
                                    <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            <div class="md:w-1/2 bg-[#6A3093]/5 relative overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80" alt="Business and Teens" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#6A3093]/40 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>`
);

html = html.replace(
    /<div class="language-slide" data-lang="de">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="language-slide" data-lang="de">
                        <div class="flex flex-col md:flex-row h-full">
                            <div class="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6A3093]/10 text-[#6A3093] font-semibold text-sm w-fit mb-6">
                                    <span class="material-symbols-rounded text-lg">school</span>
                                    <span>Preparación Oficial</span>
                                </div>
                                <h3 class="text-4xl md:text-5xl font-extrabold text-[#2d1b36] mb-6 leading-tight">Certificaciones<br>TOEFL / Cambridge</h3>
                                <p class="text-lg text-[#2d1b36]/70 mb-8 leading-relaxed font-light">
                                    Alcanza tus metas académicas y profesionales. Te preparamos estratégicamente para obtener los mejores resultados en tu examen de certificación.
                                </p>
                                <ul class="space-y-4 mb-10">
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Simuladores de examen</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Estrategias de respuesta</li>
                                    <li class="flex items-center gap-3 text-[#2d1b36]/80"><span class="material-symbols-rounded text-[#b9f600]">check_circle</span> Material oficial actualizado</li>
                                </ul>
                                <button class="w-fit px-8 py-4 rounded-full bg-[#2d1b36] text-white font-bold hover:bg-[#6A3093] hover:shadow-lg hover:shadow-[#6A3093]/30 transition-all flex items-center gap-2 group transform hover:-translate-y-1 register-btn" data-curso="Certificaciones">
                                    Prepararme Ahora
                                    <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            <div class="md:w-1/2 bg-[#6A3093]/5 relative overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80" alt="Certificaciones" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#6A3093]/40 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>`
);

html = html.replace(
    /<div class="flex flex-wrap justify-center gap-3 relative z-10">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="flex flex-wrap justify-center gap-3 relative z-10">
                        <button class="lang-btn active px-6 py-3 rounded-full font-bold text-sm transition-all" data-target="en">
                            Inglés General
                        </button>
                        <button class="lang-btn px-6 py-3 rounded-full font-bold text-sm bg-white text-[#2d1b36] hover:bg-[#6A3093]/10 transition-all" data-target="fr">
                            Business English
                        </button>
                        <button class="lang-btn px-6 py-3 rounded-full font-bold text-sm bg-white text-[#2d1b36] hover:bg-[#6A3093]/10 transition-all" data-target="de">
                            Certificaciones
                        </button>
                    </div>
                </div>`
);

// 5. Forms & Modals
html = html.replace(
    /<select id="curso-registro"[\s\S]*?<\/select>/,
    `<select id="curso-registro" name="curso" required class="w-full bg-[#FDF9FF] border-2 border-transparent focus:border-[#6A3093] rounded-xl px-4 py-3 text-[#2d1b36] outline-none transition-all cursor-pointer font-medium hover:bg-[#6A3093]/5">
                            <option value="" disabled selected>Selecciona un programa...</option>
                            <option value="Inglés General">Inglés General</option>
                            <option value="Business and Teens">Business English</option>
                            <option value="Certificaciones">Certificaciones</option>
                        </select>`
);

html = html.replace(
    /<option value="Francés">Francés<\/option>/g,
    '<option value="Business and Teens">Business English</option>'
);
html = html.replace(
    /<option value="Alemán">Alemán<\/option>/g,
    '<option value="Certificaciones">Certificaciones</option>'
);
html = html.replace(
    /<option value="Inglés">Inglés<\/option>/g,
    '<option value="Inglés General">Inglés General</option>'
);

// 6. Dummy data / Noticias
html = html.replace(
    /title: "Nuevos grupos de Francés A1"/g,
    'title: "Nuevos grupos de Inglés General A1"'
);
html = html.replace(
    /description: "Iniciamos clases el próximo lunes. ¡Aún hay lugares disponibles! Aprende el idioma del amor y la cultura europea."/g,
    'description: "Iniciamos clases el próximo lunes. ¡Aún hay lugares disponibles! Aprende el idioma universal y abre nuevas oportunidades."'
);
html = html.replace(
    /tag: "Francés"/g,
    'tag: "Inglés General"'
);

html = html.replace(
    /title: "Certificación Goethe-Zertifikat"/g,
    'title: "Certificaciones Cambridge y TOEFL"'
);
html = html.replace(
    /description: "Prepara tu examen de alemán con nuestros expertos. 95% de tasa de aprobación en los últimos años."/g,
    'description: "Prepara tu examen de certificación con nuestros expertos. 95% de tasa de aprobación en los últimos años."'
);
html = html.replace(
    /tag: "Alemán"/g,
    'tag: "Certificaciones"'
);

html = html.replace(
    /title: "Intercambios a Francia y Alemania"/g,
    'title: "Intercambios con voluntarios norteamericanos"'
);
html = html.replace(
    /description: "Conoce nuestro nuevo programa de movilidad estudiantil para alumnos destacados de nivel B2."/g,
    'description: "Practica tu inglés en sesiones de inmersión cultural con voluntarios de Estados Unidos y Canadá."'
);
html = html.replace(
    /tag: "Comunidad"/g,
    'tag: "Business English"'
);

// Fallbacks
html = html.replace(/Descuentos en cursos intensivos de francés/g, 'Descuentos en cursos intensivos de inglés');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Script Executed Cleanly');
