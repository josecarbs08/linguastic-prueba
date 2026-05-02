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
                    // Soporte universal para revelados
                    entry.target.classList.add('revealed');
                    if (entry.target.hasAttribute('data-animate')) {
                        entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
                    }
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observar elementos con clase reveal y data-animate
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, [data-animate]').forEach((el, index) => {
            this.observer.observe(el);
            
            // Añadir animaciones escalonadas para elementos agrupados automáticamente
            if (el.classList.contains('stagger-item') || el.closest('.stagger-group')) {
                // Obtenemos el índice relativo dentro de su grupo
                const group = el.closest('.stagger-group');
                let idx = index;
                if (group) {
                    const siblings = Array.from(group.querySelectorAll('.stagger-item, .reveal, .reveal-scale'));
                    idx = siblings.indexOf(el);
                }
                const delay = el.getAttribute('data-stagger-delay') || (idx * 100);
                el.style.transitionDelay = `${delay}ms`;
            }
        });
        
        console.log('✅ Scroll Animations Ready (with staggered support)');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new ScrollAnimations();
});
