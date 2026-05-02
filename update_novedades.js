const fs = require('fs');
let content = fs.readFileSync('novedades.html', 'utf8');

const mainStart = content.indexOf('<main class="pt-20 lg:pt-24">');
const footerStart = content.indexOf('<footer id="footer"');

if (mainStart === -1 || footerStart === -1) {
  console.log('Failed to find delimiters');
  process.exit(1);
}

const newMainAndScript = `    <main class="pt-20 lg:pt-24">
        <!-- Header -->
        <section class="py-16 lg:py-24 px-6 bg-gradient-to-b from-white via-primary/5 to-white relative overflow-hidden">
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full filter blur-[150px]"></div>
            </div>
            <div class="max-w-7xl mx-auto relative z-10 text-center reveal">
                <div class="inline-flex items-center gap-2.5 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-xs font-black tracking-[0.2em] uppercase border border-primary/20 mb-6">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    Lo último
                </div>
                <h1 class="text-5xl lg:text-7xl font-black text-on-surface tracking-tighter leading-none mb-6">Novedades<span class="text-secondary">.</span></h1>
                <p class="text-lg text-on-surface-variant font-medium max-w-xl mx-auto mb-10">Entérate de lo que está pasando en Lingüastic. Nuevos grupos, eventos especiales y oportunidades que no te puedes perder.</p>
                
                <!-- Search Bar -->
                <div class="max-w-lg mx-auto relative">
                    <input type="text" id="search-news" placeholder="Buscar noticias, eventos o avisos..." class="w-full px-6 py-4 rounded-full border border-primary/20 bg-white/80 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface-variant font-medium pr-14 transition-all">
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                        <span translate="no" class="material-symbols-outlined text-[1.2rem]">search</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- News Grid -->
        <section class="pb-16 lg:pb-24 px-6">
            <div class="max-w-7xl mx-auto">
                <div id="noticias-grid" class="space-y-8">
                    <!-- Dynamic content will be injected here -->
                    <div class="flex justify-center py-20">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                </div>
                <div id="load-more-container" class="mt-12 flex justify-center hidden">
                    <button id="load-more-btn" class="px-8 py-4 bg-white border border-primary/20 text-primary font-black rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer">
                        Cargar todas las noticias
                        <span translate="no" class="material-symbols-outlined text-xl">expand_more</span>
                    </button>
                </div>
            </div>
        </section>
    </main>

    <script src="js/noticias-data.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const grid = document.getElementById('noticias-grid');
            const searchInput = document.getElementById('search-news');
            const loadMoreBtn = document.getElementById('load-more-btn');
            const loadMoreContainer = document.getElementById('load-more-container');
            
            if (!grid || !window.noticiasData) return;

            let allNews = [...window.noticiasData];
            let filteredNews = [...allNews];
            let visibleCount = 6;

            function renderNews() {
                grid.innerHTML = '';
                const toShow = filteredNews.slice(0, visibleCount);

                if (toShow.length === 0) {
                    grid.innerHTML = '<div class="text-center py-20"><p class="text-2xl font-black text-on-surface-variant/50">No se encontraron noticias.</p></div>';
                    loadMoreContainer.classList.add('hidden');
                    return;
                }

                // 1. TOP SECTION (Featured + 2 side cards) - Up to first 3 items
                const topSection = document.createElement('div');
                topSection.className = 'grid lg:grid-cols-12 gap-6 reveal';
                
                const firstThree = toShow.slice(0, 3);
                
                if (firstThree[0]) {
                    const featured = firstThree[0];
                    topSection.innerHTML += \`
                        <div class="lg:col-span-8 group relative rounded-[2.5rem] overflow-hidden min-h-[450px] lg:min-h-[550px] flex flex-col justify-end bg-surface border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all duration-500">
                            <img src="\${featured.imagen}" alt="\${featured.titulo}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-60% to-transparent"></div>
                            <div class="absolute top-8 left-8 z-10">
                                <span class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.15em] shadow-lg">
                                    <span class="w-1.5 h-1.5 bg-[#B9F600] rounded-full animate-pulse shadow-[0_0_8px_#B9F600]"></span>
                                    \${featured.tag || 'Noticia'}
                                </span>
                            </div>
                            <div class="relative z-10 p-8 lg:p-12">
                                <div class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-white text-[10px] font-black tracking-widest uppercase mb-4">\${featured.fecha}</div>
                                <h2 class="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">\${featured.titulo}</h2>
                                <p class="text-white/80 font-medium leading-relaxed text-base max-w-xl mb-6">\${featured.descripcion}</p>
                                <a href="noticia.html?id=\${featured.id}" class="inline-flex items-center gap-2 bg-white text-primary font-black px-6 py-3 rounded-full text-sm hover:scale-105 transition-all shadow-xl">
                                    Leer más
                                    <span translate="no" class="material-symbols-outlined text-lg">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    \`;
                }

                if (firstThree.length > 1) {
                    const sideCol = document.createElement('div');
                    sideCol.className = 'lg:col-span-4 flex flex-col gap-6';
                    
                    for (let i = 1; i < firstThree.length; i++) {
                        const item = firstThree[i];
                        sideCol.innerHTML += \`
                            <a href="noticia.html?id=\${item.id}" class="group relative rounded-[2.5rem] overflow-hidden flex-1 flex flex-col justify-end bg-primary/90 border border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 min-h-[260px]">
                                <img src="\${item.imagen}" alt="\${item.titulo}" class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" loading="lazy">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                                <div class="absolute top-6 left-6 z-10">
                                    <span class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg">\${item.tag || 'Noticia'}</span>
                                </div>
                                <div class="relative z-10 p-6 lg:p-8">
                                    <div class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-white text-[10px] font-black tracking-widest uppercase mb-3">\${item.fecha}</div>
                                    <h3 class="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-2 group-hover:text-[#B9F600] transition-colors">\${item.titulo}</h3>
                                    <p class="text-white/70 text-sm font-medium leading-relaxed line-clamp-2">\${item.descripcion}</p>
                                </div>
                            </a>
                        \`;
                    }
                    topSection.appendChild(sideCol);
                }
                
                grid.appendChild(topSection);

                // 2. ADDITIONAL ROW (Grid) - Remaining items
                if (toShow.length > 3) {
                    const bottomGrid = document.createElement('div');
                    bottomGrid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal';
                    
                    toShow.slice(3).forEach(item => {
                        bottomGrid.innerHTML += \`
                            <a href="noticia.html?id=\${item.id}" class="bg-white border-2 border-primary/5 rounded-[2.5rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">\${item.tag || 'Noticia'}</div>
                                    <span translate="no" class="material-symbols-outlined text-primary/30 group-hover:text-primary transition-colors">\${item.icon || 'star'}</span>
                                </div>
                                <h3 class="text-xl font-black text-primary mb-3 tracking-tight leading-tight group-hover:text-secondary transition-colors">\${item.titulo}</h3>
                                <p class="text-on-surface-variant text-sm font-medium leading-relaxed line-clamp-3 mb-6 flex-grow">\${item.descripcion}</p>
                                <div class="mt-auto flex items-center justify-between border-t border-primary/5 pt-4">
                                    <span class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">\${item.fecha}</span>
                                    <span class="text-primary font-black text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">Ver más <span translate="no" class="material-symbols-outlined text-sm">arrow_forward</span></span>
                                </div>
                            </a>
                        \`;
                    });
                    grid.appendChild(bottomGrid);
                }

                // Handle Load More Button Visibility
                if (filteredNews.length > visibleCount) {
                    loadMoreContainer.classList.remove('hidden');
                } else {
                    loadMoreContainer.classList.add('hidden');
                }

                // Trigger reveal animations
                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => {
                        if (window.observer) {
                            window.observer.observe(el);
                        } else {
                            el.classList.add('revealed');
                        }
                    });
                }, 100);
            }

            // Initial render
            renderNews();

            // Search logic
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                filteredNews = allNews.filter(news => 
                    news.titulo.toLowerCase().includes(query) || 
                    news.descripcion.toLowerCase().includes(query) ||
                    (news.tag && news.tag.toLowerCase().includes(query))
                );
                visibleCount = 6; // Reset visible count on search
                renderNews();
            });

            // Load more logic
            loadMoreBtn.addEventListener('click', () => {
                visibleCount += 6; // Load 6 more each time (or all)
                renderNews();
            });
        });
    </script>
`;

content = content.substring(0, mainStart) + newMainAndScript + content.substring(footerStart);
fs.writeFileSync('novedades.html', content);
console.log('novedades.html updated successfully');