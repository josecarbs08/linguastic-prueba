// ===== MÓDULO: Carrusel de Reseñas =====
// Maneja el carrusel infinito de reseñas de Google

class ReviewCarousel {
    constructor() {
        this.slider = document.getElementById('reviews-carousel');
        this.slides = [];
        this.currentIndex = 0;
        this.autoPlayTimer = null;
        this.isAutoPlay = true;
        
        if (this.slider) this.init();
    }
    
    init() {
        this.slides = Array.from(this.slider.querySelectorAll('.review-card'));
        
        if (this.slides.length > 0) {
            this.setupClones();
            this.attachEventListeners();
            this.startAutoPlay();
            console.log('✓ Review Carousel Ready');
        }
    }
    
    setupClones() {
        // Crear suficientes clones para scroll continuo
        const clonesToCreate = 3;
        
        for (let i = 0; i < clonesToCreate; i++) {
            this.slides.forEach((slide, index) => {
                const clone = slide.cloneNode(true);
                clone.classList.add('clone');
                this.slider.appendChild(clone);
            });
        }
    }
    
    attachEventListeners() {
        // Pausar auto-play en hover
        this.slider.addEventListener('mouseenter', () => {
            this.isAutoPlay = false;
            this.stopAutoPlay();
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.isAutoPlay = true;
            this.startAutoPlay();
        });
    }
    
    nextSlide() {
        this.currentIndex++;
        this.updateScroll();
    }
    
    updateScroll() {
        const slideWidth = this.slides[0].offsetWidth + 20; // incluir gap
        const scrollLeft = this.currentIndex * slideWidth;
        
        this.slider.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
    
    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            if (this.isAutoPlay) this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayTimer);
    }
}

window.ReviewCarousel = ReviewCarousel;
