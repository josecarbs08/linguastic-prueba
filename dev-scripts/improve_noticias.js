const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Remove the old arrows container
$('#noticias .max-w-7xl .flex.items-center.gap-3').remove();

// Prepare Floating arrows HTML
const arrowsHtml = '<div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 lg:px-8 z-20">' +
    '<button id="noticias-prev-float" class="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto transform hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-[-20px] group-hover:translate-x-0" aria-label="Anterior">' +
        '<span translate="no" class="material-symbols-outlined text-3xl">chevron_left</span>' +
    '</button>' +
    '<button id="noticias-next-float" class="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto transform hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-[20px] group-hover:translate-x-0" aria-label="Siguiente">' +
        '<span translate="no" class="material-symbols-outlined text-3xl">chevron_right</span>' +
    '</button>' +
'</div>';

// Make the carousel wrapper a group so we can show/hide arrows on hover
const carouselWrapper = $('#noticias-grid').parent();
carouselWrapper.addClass('group');
carouselWrapper.append(arrowsHtml);

// 2. Remove the old JS script for the carousel
$('#noticias-carousel-js').remove();

// 3. Add the improved JS script
const newJs = '<script id="noticias-carousel-js">\n' +
'document.addEventListener("DOMContentLoaded", () => {\n' +
'    const grid = document.getElementById("noticias-grid");\n' +
'    const prevBtn = document.getElementById("noticias-prev-float");\n' +
'    const nextBtn = document.getElementById("noticias-next-float");\n' +
'    let autoplayInterval;\n' +
'\n' +
'    if (grid && prevBtn && nextBtn) {\n' +
'        const scrollAmount = 404; \n' +
'\n' +
'        const scrollCarousel = (direction) => {\n' +
'            const maxScrollLeft = grid.scrollWidth - grid.clientWidth;\n' +
'            \n' +
'            if (direction === "next") {\n' +
'                if (grid.scrollLeft >= maxScrollLeft - 10) {\n' +
'                    grid.scrollTo({ left: 0, behavior: "smooth" });\n' +
'                } else {\n' +
'                    grid.scrollBy({ left: scrollAmount, behavior: "smooth" });\n' +
'                }\n' +
'            } else {\n' +
'                if (grid.scrollLeft <= 10) {\n' +
'                    grid.scrollTo({ left: maxScrollLeft, behavior: "smooth" });\n' +
'                } else {\n' +
'                    grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });\n' +
'                }\n' +
'            }\n' +
'        };\n' +
'\n' +
'        prevBtn.addEventListener("click", () => {\n' +
'            scrollCarousel("prev");\n' +
'            resetAutoplay();\n' +
'        });\n' +
'        \n' +
'        nextBtn.addEventListener("click", () => {\n' +
'            scrollCarousel("next");\n' +
'            resetAutoplay();\n' +
'        });\n' +
'\n' +
'        const startAutoplay = () => {\n' +
'            autoplayInterval = setInterval(() => {\n' +
'                scrollCarousel("next");\n' +
'            }, 4000);\n' +
'        };\n' +
'\n' +
'        const stopAutoplay = () => {\n' +
'            clearInterval(autoplayInterval);\n' +
'        };\n' +
'\n' +
'        const resetAutoplay = () => {\n' +
'            stopAutoplay();\n' +
'            startAutoplay();\n' +
'        };\n' +
'\n' +
'        grid.addEventListener("mouseenter", stopAutoplay);\n' +
'        grid.addEventListener("mouseleave", startAutoplay);\n' +
'        prevBtn.addEventListener("mouseenter", stopAutoplay);\n' +
'        nextBtn.addEventListener("mouseleave", startAutoplay);\n' +
'        nextBtn.addEventListener("mouseenter", stopAutoplay);\n' +
'        prevBtn.addEventListener("mouseleave", startAutoplay);\n' +
'\n' +
'        startAutoplay();\n' +
'    }\n' +
'});\n' +
'</script>';

$('body').append(newJs);

// 4. Hide scrollbar
const extraCss = '<style id="noticias-extra-css">\n' +
'#noticias-grid {\n' +
'    -ms-overflow-style: none;\n' +
'    scrollbar-width: none;\n' +
'}\n' +
'#noticias-grid::-webkit-scrollbar {\n' +
'    display: none;\n' +
'}\n' +
'</style>';

if ($('#noticias-extra-css').length === 0) {
    $('head').append(extraCss);
}

fs.writeFileSync('index.html', $.html());
console.log("Updated Noticias layout with floating arrows and autoplay.");
