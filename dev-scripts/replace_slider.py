import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the new HTML for the section
new_slider_html = """
        <section id="languages"
            class="py-24 px-6 bg-gradient-to-b from-white via-[#F5F1FF] to-white overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16 space-y-4">
                    <h2 class="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4 font-display">Nuestros Programas de Inglés</h2>
                    <p class="text-xl text-on-surface-variant font-medium">Diseñados para cada etapa de tu vida y tus metas.</p>
                </div>

                <div class="slider-container max-w-5xl mx-auto">
                    <!-- Language Slider Items -->
                    <div class="language-slider relative min-h-[600px]">

                        <!-- English Slide 1: Adultos -->
                        <div class="language-slide active w-full" data-index="0">
                            <div
                                class="bg-gradient-to-br from-white to-[#fceeff] rounded-[3rem] lg:rounded-[4rem] p-6 lg:p-16 shadow-2xl border border-primary/5 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-center relative overflow-hidden">
                                <div
                                    class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl">
                                </div>
                                <div
                                    class="lg:col-span-3 space-y-6 lg:space-y-8 relative z-10 text-center lg:text-left">
                                    <div class="lang-header-container">
                                        <div class="flex flex-col lg:flex-row items-center gap-4">
                                            <div
                                                class="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center">
                                                <span class="material-symbols-outlined text-primary text-4xl">language</span>
                                            </div>
                                            <div>
                                                <h3
                                                    class="text-4xl lg:text-5xl font-black text-primary font-headline leading-tight">
                                                    Inglés General</h3>
                                                <p class="text-primary/60 font-black tracking-widest uppercase text-sm">
                                                    Adultos y Jóvenes · A1 - C1</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p
                                        class="lang-description text-lg lg:text-2xl text-on-surface-variant font-medium leading-relaxed font-body italic">
                                        "Aprende inglés de verdad con un enfoque comunicativo. Nuestras clases interactivas están diseñadas para que hables desde el primer día, conectando tu aprendizaje con situaciones reales de viaje, negocios y vida diaria."
                                    </p>
                                    <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <span class="bg-primary/10 px-4 py-2 rounded-full text-xs font-bold text-primary">CONVERSACIONAL</span>
                                        <span class="bg-primary/10 px-4 py-2 rounded-full text-xs font-bold text-primary">VIAJES</span>
                                        <span class="bg-primary/10 px-4 py-2 rounded-full text-xs font-bold text-primary">NEGOCIOS</span>
                                    </div>
                                    <div class="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                                        <button class="open-registration bg-secondary text-on-secondary-container px-10 py-4 rounded-full font-black text-lg transition-transform hover:scale-105 shadow-xl shadow-secondary/30" data-curso="Inglés General">
                                            Inscribirme ahora
                                        </button>
                                        <a href="#clases" class="bg-primary/5 text-primary border-2 border-primary/10 px-10 py-4 rounded-full font-black text-lg transition-all hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center">
                                            Saber más
                                        </a>
                                    </div>
                                </div>
                                <div class="lg:col-span-2 relative aspect-[9/16] max-w-[400px] lg:max-w-[320px] mx-auto lg:mx-0 w-full rounded-[3rem] overflow-hidden transform-gpu group shadow-2xl lang-vid-container cursor-pointer border-4 border-white/20">
                                    <div class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/60 backdrop-blur rounded-b-2xl z-30"></div>
                                    <video src="assets/videoingles.mp4#t=1" class="w-full h-full object-cover lang-video outline-none scale-[1.01]" style="min-width: 100%; min-height: 100%; object-fit: cover;" muted playsinline preload="metadata"></video>
                                    <div class="audio-toggle-btn absolute inset-0 flex items-center justify-center transition-all duration-700 opacity-100 z-20 pointer-events-none">
                                        <div class="w-20 h-20 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-[0_0_30px_rgba(106,48,147,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 pointer-events-auto">
                                            <span translate="no" class="material-symbols-outlined text-white text-5xl translate-x-1" style="font-variation-settings: 'FILL' 1">play_arrow</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Kids and Teens -->
                        <div class="language-slide w-full" data-index="1">
                            <div
                                class="bg-gradient-to-br from-[#FFF8E7] to-[#FFE8A1] rounded-[3rem] lg:rounded-[4rem] p-6 lg:p-16 shadow-2xl flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-center relative overflow-hidden">
                                <div
                                    class="absolute -bottom-20 -left-20 w-80 h-80 bg-white/40 rounded-full blur-3xl">
                                </div>
                                <div
                                    class="lg:col-span-3 space-y-6 lg:space-y-8 text-[#8B6914] relative z-10 text-center lg:text-left">
                                    <div class="lang-header-container">
                                        <div class="flex flex-col lg:flex-row items-center gap-4">
                                            <div
                                                class="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center">
                                                <span translate="no" class="material-symbols-outlined text-[#8B6914] text-4xl">cruelty_free</span>
                                            </div>
                                            <div>
                                                <h3
                                                    class="text-4xl lg:text-5xl font-black text-[#8B6914] font-headline leading-tight">
                                                    Kids & Teens</h3>
                                                <p
                                                    class="text-[#8B6914]/60 font-black tracking-widest uppercase text-sm font-body">
                                                    Infantil · De 6 a 15 años</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p
                                        class="lang-description text-lg lg:text-2xl text-[#8B6914]/90 font-medium leading-relaxed font-body italic">
                                        "El aprendizaje a través del juego. Nuestros programas para niños y adolescentes aprovechan su curiosidad natural, usando metodologías lúdicas, canciones y proyectos dinámicos que garantizan un acento impecable desde temprana edad."
                                    </p>
                                    <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <span class="bg-white/40 px-4 py-2 rounded-full text-xs font-bold">LÚDICO</span>
                                        <span class="bg-white/40 px-4 py-2 rounded-full text-xs font-bold">DINÁMICO</span>
                                        <span class="bg-white/40 px-4 py-2 rounded-full text-xs font-bold">FONÉTICA</span>
                                    </div>
                                    <div class="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                                        <button class="open-registration bg-[#8B6914] text-white px-10 py-4 rounded-full font-black text-lg transition-transform hover:scale-105 shadow-xl shadow-[#8B6914]/30" data-curso="Kids and Teens">
                                            Inscribir a mi hijo(a)
                                        </button>
                                        <a href="#clases" class="bg-white/30 text-[#8B6914] border-2 border-[#8B6914]/10 px-10 py-4 rounded-full font-black text-lg transition-all hover:bg-[#8B6914] hover:text-white flex items-center justify-center">
                                            Saber más
                                        </a>
                                    </div>
                                </div>
                                <div class="lg:col-span-2 relative aspect-[9/16] max-w-[400px] lg:max-w-[320px] mx-auto lg:mx-0 w-full rounded-[3rem] overflow-hidden transform-gpu group shadow-2xl lang-vid-container cursor-pointer border-4 border-white/40 bg-black/5">
                                    <div class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/60 backdrop-blur rounded-b-2xl z-30"></div>
                                    <video src="assets/videoaleman.mp4#t=0.001" class="w-full h-full object-cover lang-video outline-none scale-[1.01]" style="min-width: 100%; min-height: 100%; object-fit: cover;" muted playsinline preload="metadata"></video>
                                    <div class="audio-toggle-btn absolute inset-0 flex items-center justify-center transition-all duration-700 opacity-100 z-20 pointer-events-none">
                                        <div class="w-20 h-20 bg-[#FFD60A]/90 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-[0_0_30px_rgba(255,214,10,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 pointer-events-auto">
                                            <span translate="no" class="material-symbols-outlined text-[#8B6914] text-5xl translate-x-1" style="font-variation-settings: 'FILL' 1">play_arrow</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Certificaciones Slide -->
                        <div class="language-slide w-full" data-index="2">
                            <div
                                class="bg-gradient-to-br from-[#F0FDF4] to-[#BBF7D0] rounded-[3rem] lg:rounded-[4rem] p-6 lg:p-16 shadow-2xl border border-green-900/10 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-center relative overflow-hidden">
                                <div
                                    class="absolute top-1/2 right-0 w-80 h-80 bg-white/40 rounded-full blur-[80px] -translate-y-1/2">
                                </div>
                                <div class="absolute bottom-0 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-[60px]"></div>

                                <div
                                    class="lg:col-span-3 space-y-6 lg:space-y-8 relative z-10 text-center lg:text-left text-[#166534]">
                                    <div class="lang-header-container">
                                        <div class="flex flex-col lg:flex-row items-center gap-4">
                                            <div
                                                class="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center">
                                                <span translate="no" class="material-symbols-outlined text-[#166534] text-4xl">verified</span>
                                            </div>
                                            <div>
                                                <h3
                                                    class="text-4xl lg:text-5xl font-black text-[#166534] font-headline leading-tight">
                                                    Certificaciones</h3>
                                                <p
                                                    class="text-[#166534]/60 font-black tracking-widest uppercase text-sm font-body">
                                                    Avanzado · TOEFL y Cambridge</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p
                                        class="lang-description text-lg lg:text-2xl text-[#166534]/90 font-medium leading-relaxed font-body italic">
                                        "Tu pasaporte académico y profesional. Te preparamos específicamente para superar con éxito los exámenes estandarizados internacionales más reconocidos, abriendo las puertas de universidades extranjeras y empresas multinacionales."
                                    </p>
                                    <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <span class="bg-white/50 px-4 py-2 rounded-full text-xs font-bold">TOEFL</span>
                                        <span class="bg-white/50 px-4 py-2 rounded-full text-xs font-bold">CAMBRIDGE</span>
                                        <span class="bg-white/50 px-4 py-2 rounded-full text-xs font-bold">IELTS</span>
                                    </div>
                                    <div class="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                                        <button class="open-registration bg-[#166534] text-white px-10 py-4 rounded-full font-black text-lg transition-transform hover:scale-105 shadow-xl shadow-[#166534]/30" data-curso="Certificaciones">
                                            Prepararme ahora
                                        </button>
                                        <a href="#clases" class="bg-white/30 text-[#166534] border-2 border-[#166534]/10 px-10 py-4 rounded-full font-black text-lg transition-all hover:bg-[#166534] hover:text-white flex items-center justify-center">
                                            Ver fechas
                                        </a>
                                    </div>
                                </div>
                                <div class="lg:col-span-2 relative aspect-[9/16] max-w-[400px] lg:max-w-[320px] mx-auto lg:mx-0 w-full rounded-[3rem] overflow-hidden transform-gpu group shadow-2xl lang-vid-container cursor-pointer border-4 border-white/20 bg-black/5">
                                    <div class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/60 backdrop-blur rounded-b-2xl z-30"></div>
                                    <video src="assets/videofrances.mp4#t=0.001" class="w-full h-full object-cover lang-video outline-none scale-[1.01]" style="min-width: 100%; min-height: 100%; object-fit: cover;" muted playsinline preload="metadata"></video>
                                    <div class="audio-toggle-btn absolute inset-0 flex items-center justify-center transition-all duration-700 opacity-100 z-20 pointer-events-none">
                                        <div class="w-20 h-20 bg-[#4ADE80]/90 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-[0_0_30px_rgba(74,222,128,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 pointer-events-auto">
                                            <span translate="no" class="material-symbols-outlined text-[#166534] text-5xl translate-x-1" style="font-variation-settings: 'FILL' 1">play_arrow</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Desktop/Tablet Slide Navigation Dots & Arrows -->
                <div class="mt-8 flex items-center justify-center gap-6">
                    <button
                        class="lang-nav-btn w-12 h-12 rounded-full bg-white border border-primary/10 text-primary shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all hidden md:flex items-center justify-center"
                        onclick="prevLang()" aria-label="Programa anterior">
                        <span translate="no" class="material-symbols-outlined">arrow_back</span>
                    </button>

                    <div class="lang-dots flex items-center gap-2">
                        <div class="lang-dot active" onclick="goToLang(0)" role="button" aria-label="Ir a Inglés General"></div>
                        <div class="lang-dot" onclick="goToLang(1)" role="button" aria-label="Ir a Kids and Teens"></div>
                        <div class="lang-dot" onclick="goToLang(2)" role="button" aria-label="Ir a Certificaciones"></div>
                    </div>

                    <button
                        class="lang-nav-btn w-12 h-12 rounded-full bg-white border border-primary/10 text-primary shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all hidden md:flex items-center justify-center"
                        onclick="nextLang()" aria-label="Programa siguiente">
                        <span translate="no" class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>"""

# Using regex to find and replace the whole <section id="languages"> ... </section>
pattern = re.compile(r'<section id="languages".*?</section>', re.DOTALL)
html = pattern.sub(new_slider_html, html, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
