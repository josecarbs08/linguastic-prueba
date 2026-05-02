// ===== MÓDULO: Carrusel de Idiomas =====
// Maneja la lógica del carrusel de idiomas con sincronización entre desktop/mobile

class LanguageCarousel {
    constructor() {
        this.slider = document.getElementById('language-carousel');
        this.nextBtn = document.getElementById('carousel-next');
        this.prevBtn = document.getElementById('carousel-prev');
        this.dots = document.querySelectorAll('[data-carousel-dot]');
        this.videos = document.querySelectorAll('.lang-video');
        
        this.currentSlide = 0;
        this.slideTimer = null;
        this.originalSlides = [];
        this.isMoving = false;
        
        if (this.slider) this.init();
    }
    
    init() {
        this.originalSlides = Array.from(this.slider.querySelectorAll('.language-slide:not(.clone)'));
        this.setupInfiniteLoop();
        this.attachEventListeners();
        this.showSlide(0);
        this.resetTimer();
    }
    
    setupInfiniteLoop() {
        if (!this.slider || this.originalSlides.length < 2) return;
        
        const firstClone = this.originalSlides[0].cloneNode(true);
        const lastClone = this.originalSlides[this.originalSlides.length - 1].cloneNode(true);
        
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        this.slider.appendChild(firstClone);
        this.slider.insertBefore(lastClone, this.slider.firstChild);
    }
    
    attachEventListeners() {
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.goToSlide(i));
        });
        
        // Video controls
        if (this.slider) {
            this.slider.addEventListener('click', (e) => this.handleVideoClick(e));
            this.slider.addEventListener('mouseover', (e) => this.handleVideoHover(e));
        }
    }
    
    handleVideoClick(e) {
        const container = e.target.closest('.lang-vid-container');
        if (!container) return;
        
        const video = container.querySelector('video');
        const btn = container.querySelector('.audio-toggle-btn');
        const icon = btn?.querySelector('.material-symbols-outlined');
        
        if (video.paused) {
            video.play();
            video.muted = false;
            if (icon) icon.textContent = 'pause';
            if (btn) {
                btn.classList.add('opacity-0', 'scale-110', 'pointer-events-none');
                btn.classList.remove('opacity-100', 'scale-100');
            }
        } else {
            video.pause();
            if (icon) icon.textContent = 'play_arrow';
            if (btn) {
                btn.classList.remove('opacity-0', 'scale-110', 'pointer-events-none');
                btn.classList.add('opacity-100', 'scale-100');
            }
        }
    }
    
    handleVideoHover(e) {
        const container = e.target.closest('.lang-vid-container');
        if (!container) return;
        const video = container.querySelector('video');
        const btn = container.querySelector('.audio-toggle-btn');
        if (video && !video.paused && btn) btn.classList.remove('opacity-0');
    }
    
    showSlide(index) {
        if (this.isMoving) return;
        
        this.videos.forEach(v => v.pause());
        const allSlides = this.slider.querySelectorAll('.language-slide');
        const dots = document.querySelectorAll('[data-carousel-dot]');
        
        allSlides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        this.currentSlide = (index + this.originalSlides.length) % this.originalSlides.length;
        this.originalSlides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
        
        this.resetTimer();
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    goToSlide(i) {
        this.showSlide(i);
    }
    
    resetTimer() {
        clearInterval(this.slideTimer);
        this.slideTimer = setInterval(() => {
            const isAnyVideoPlaying = Array.from(this.videos).some(v => !v.paused && !v.ended);
            if (!isAnyVideoPlaying) this.nextSlide();
        }, 7000);
    }
}

// Exportar para uso global
window.LanguageCarousel = LanguageCarousel;
