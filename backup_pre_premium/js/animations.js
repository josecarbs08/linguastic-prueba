// ===== MÓDULO: Animaciones al Scroll =====
// Maneja las animaciones reveal mientras haces scroll

class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observar todos los elementos con data-animate
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
        
        console.log('✓ Scroll Animations Ready');
    }
}

window.ScrollAnimations = ScrollAnimations;
