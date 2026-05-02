const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(content);

const css = `
/* Navigation Dropdowns */
.nav-item-with-dropdown {
    position: relative;
}
.mega-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 1rem; /* Invisible bridge for the mouse */
    z-index: 100;
}
.nav-item-with-dropdown:hover .mega-dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
}
.mega-dropdown-inner {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0 20px 40px -10px rgba(106,48,147,0.15);
    border: 1px solid rgba(106,48,147,0.1);
    width: 340px;
}
.mega-dropdown-sm .mega-dropdown-inner {
    width: 280px;
}
.lang-dropdown-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 1rem;
    transition: background-color 0.2s;
}
.lang-dropdown-card:hover {
    background-color: rgba(106,48,147,0.05);
}
.lang-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.quick-link-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 1rem;
    transition: background-color 0.2s;
}
.quick-link-item:hover {
    background-color: rgba(106,48,147,0.05);
}
.ql-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.dropdown-arrow {
    transition: transform 0.3s;
}
.nav-item-with-dropdown:hover .dropdown-arrow {
    transform: rotate(180deg);
}
`;

// Append CSS if not exists
if (!$('style').text().includes('.mega-dropdown')) {
    $('style').first().append(css);
}

const newNavHtml = `
<nav class="fixed top-0 left-0 right-0 z-50 glass-nav h-16 lg:h-20 flex items-center">
        <div class="flex items-center w-full px-8 max-w-7xl mx-auto h-full">
            <!-- Logo + Brand Name -->
            <div class="flex-1 flex justify-start">
                <a href="#home" class="flex items-center gap-3 select-none group">
                    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center p-0.5 overflow-hidden ring-4 ring-primary/10">
                        <img src="assets/linguastic.jpg" alt="Lingüastic - Escuela de Idiomas en Tehuacán" class="w-full h-full object-cover rounded-full" fetchpriority="high" loading="eager">
                    </div>
                    <span class="hidden lg:block text-xl font-black text-primary tracking-tight group-hover:text-primary/80 transition-colors">Lingüastic</span>
                </a>
            </div>

            <!-- Center: Desktop Navigation with Mega Menus -->
            <div class="hidden lg:flex flex-none items-center justify-center gap-2 font-bold text-sm tracking-wide h-full">
                <!-- Programas (with mega dropdown) -->
                <div class="nav-item-with-dropdown h-full flex items-center relative" id="dropdown-idiomas">
                    <span class="nav-dropdown-trigger nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 px-4 h-10 rounded-xl hover:bg-primary/5 flex items-center justify-center gap-0.5" id="nav-languages">
                        Programas
                        <span translate="no" class="material-symbols-outlined dropdown-arrow leading-none" style="font-size: 1.25rem;">expand_more</span>
                    </span>
                    <div class="mega-dropdown">
                        <div class="mega-dropdown-inner relative">
                            <div class="mb-4">
                                <p class="text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-1">Nuestros Programas</p>
                            </div>
                            <div class="grid grid-cols-1 gap-1">
                                <a href="#languages" class="lang-dropdown-card" data-lang="0" onclick="goToLang(0)">
                                    <div class="lang-icon bg-blue-50 text-2xl">🇬🇧</div>
                                    <div>
                                        <p class="font-black text-on-surface text-sm">Inglés General</p>
                                        <p class="text-xs text-on-surface-variant/60 font-medium">A1 a C1 · Negocios, Viajes, Académico</p>
                                    </div>
                                </a>
                                <a href="#languages" class="lang-dropdown-card" data-lang="1" onclick="goToLang(1)">
                                    <div class="lang-icon bg-sky-50 text-2xl">🧒</div>
                                    <div>
                                        <p class="font-black text-on-surface text-sm">Business English</p>
                                        <p class="text-xs text-on-surface-variant/60 font-medium">A partir de los 13 años · Divertido e Interactivo</p>
                                    </div>
                                </a>
                                <a href="#certifications" class="lang-dropdown-card" data-lang="2" onclick="goToLang(2)">
                                    <div class="lang-icon bg-amber-50 text-2xl">🎓</div>
                                    <div>
                                        <p class="font-black text-on-surface text-sm">Certificaciones</p>
                                        <p class="text-xs text-on-surface-variant/60 font-medium">TOEFL, Cambridge, CENNI y más</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Escuela (with dropdown) -->
                <div class="nav-item-with-dropdown h-full flex items-center relative" id="dropdown-escuela">
                    <span class="nav-dropdown-trigger nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 px-4 h-10 rounded-xl hover:bg-primary/5 flex items-center justify-center gap-0.5">
                        Escuela
                        <span translate="no" class="material-symbols-outlined dropdown-arrow leading-none" style="font-size: 1.25rem;">expand_more</span>
                    </span>
                    <div class="mega-dropdown mega-dropdown-sm">
                        <div class="mega-dropdown-inner relative">
                            <div class="space-y-1">
                                <a href="#clases" class="quick-link-item">
                                    <div class="ql-icon bg-secondary/20">
                                        <span translate="no" class="material-symbols-outlined text-primary text-lg">school</span>
                                    </div>
                                    <div>
                                        <p class="font-black text-sm">Nuestras clases</p>
                                        <p class="text-[11px] text-on-surface-variant/60 font-medium">Método, horarios y programas</p>
                                    </div>
                                </a>
                                <a href="#noticias" class="quick-link-item">
                                    <div class="ql-icon bg-primary/10">
                                        <span translate="no" class="material-symbols-outlined text-primary text-lg">newspaper</span>
                                    </div>
                                    <div>
                                        <p class="font-black text-sm">Novedades</p>
                                        <p class="text-[11px] text-on-surface-variant/60 font-medium">Noticias y eventos recientes</p>
                                    </div>
                                </a>
                                <a href="/nosotros" class="quick-link-item">
                                    <div class="ql-icon bg-tertiary/10">
                                        <span translate="no" class="material-symbols-outlined text-tertiary text-lg">groups</span>
                                    </div>
                                    <div>
                                        <p class="font-black text-sm">Nosotros</p>
                                        <p class="text-[11px] text-on-surface-variant/60 font-medium">Conoce al equipo</p>
                                    </div>
                                </a>
                                <a href="#faq" class="quick-link-item">
                                    <div class="ql-icon bg-[#FFD60A]/20">
                                        <span translate="no" class="material-symbols-outlined text-[#8B6914] text-lg">help</span>
                                    </div>
                                    <div>
                                        <p class="font-black text-sm">Preguntas frecuentes</p>
                                        <p class="text-[11px] text-on-surface-variant/60 font-medium">Dudas resueltas al instante</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 px-4 h-10 rounded-xl hover:bg-primary/5 flex items-center justify-center" href="#noticias" id="nav-noticias">Noticias</a>
                <a class="nav-link text-on-surface-variant hover:text-primary transition-colors duration-300 px-4 h-10 rounded-xl hover:bg-primary/5 flex items-center justify-center" href="#faq" id="nav-faq">Preguntas</a>
            </div>

            <!-- Right Side: Plataforma + Registration + Mobile -->
            <div class="flex-1 flex justify-end items-center gap-3">
                <!-- Plataforma/Login Button — Premium -->
                <a href="https://plataforma.linguastic.net" target="_blank" id="nav-plataforma" class="btn-plataforma hidden md:inline-flex items-center justify-center gap-1.5 px-6 h-10 rounded-full font-black text-sm text-white relative z-10 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 leading-none">
                    <span translate="no" class="material-symbols-outlined text-[1.15rem] relative z-10 flex items-center justify-center" style="font-variation-settings: 'FILL' 1;">login</span>
                    <span class="relative z-10 translate-y-[1px]">Iniciar sesión</span>
                </a>

                <!-- Registration Button -->
                <button class="open-registration hidden sm:inline-flex items-center justify-center bg-secondary text-on-secondary-container px-7 h-10 rounded-full font-black text-sm transition-all hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 active:scale-95 duration-300 leading-none">
                    <span class="translate-y-[1px]">Inscríbete</span>
                </button>

                <!-- Mobile Toggle -->
                <button id="mobile-menu-toggle" class="lg:hidden w-10 h-10 flex items-center justify-center text-primary" aria-label="Abrir menú">
                    <span translate="no" class="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>
        </div>
    </nav>
`;

const mobileMenuHtml = `
<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-[200] opacity-0 pointer-events-none transition-all duration-500 overflow-hidden h-[100dvh]">
        <div class="absolute inset-0 bg-primary/20 backdrop-blur-2xl transition-opacity duration-500 h-full"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-start pt-24 pb-12 px-8 transform translate-y-10 transition-all duration-500 opacity-0 bg-white/40 overflow-y-auto h-full">
            <button id="mobile-menu-close" class="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-primary backdrop-blur-md border border-white/30 hover:bg-white hover:scale-110 transition-all">
                <span translate="no" class="material-symbols-outlined text-3xl">close</span>
            </button>
            <nav class="flex flex-col gap-6 items-center w-full max-w-xs h-full">
                <a href="#home" class="text-4xl font-black text-primary hover:scale-105 transition-transform" onclick="closeMenu()">Inicio</a>
                <a href="#languages" class="text-4xl font-black text-primary hover:scale-105 transition-transform" onclick="closeMenu()">Programas</a>
                <a href="#clases" class="text-4xl font-black text-primary hover:scale-105 transition-transform" onclick="closeMenu()">Clases</a>
                <a href="#noticias" class="text-3xl font-black text-primary hover:scale-105 transition-transform" onclick="closeMenu()">Noticias</a>
                <a href="#faq" class="text-3xl font-black text-primary/80 hover:scale-105 transition-transform" onclick="closeMenu()">Preguntas</a>

                <!-- Plataforma / Iniciar Sesión -->
                <a href="https://plataforma.linguastic.net" target="_blank" class="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl signature-gradient text-white hover:scale-105 transition-all shadow-lg" onclick="closeMenu()">
                    <span translate="no" class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1">login</span>
                    <span class="text-xl font-black">Iniciar sesión</span>
                </a>

                <div class="mt-auto pt-6 w-full">
                    <button class="open-registration w-full bg-secondary text-on-secondary-container py-5 rounded-full font-black text-2xl shadow-xl shadow-secondary/30 active:scale-95 transition-all">
                        ¡Inscríbete!
                    </button>
                </div>
            </nav>
        </div>
    </div>
`;

$('nav').replaceWith(newNavHtml);
$('#mobile-menu').replaceWith(mobileMenuHtml);

fs.writeFileSync('index.html', $.html());
console.log('Navigation updated and CSS injected!');
