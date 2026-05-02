
document.addEventListener('DOMContentLoaded', () => {
    // ===== INTERSECTION OBSERVER FOR SCROLL REVEALS =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Don't unobserve - allow re-animation is optional
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ===== ANIMATED COUNTER =====
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Trigger counter animation when stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(statsBar);
    }

    // ===== SMOOTH NAVBAR SHADOW ON SCROLL =====
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 100) {
                nav.style.boxShadow = '0 8px 32px -8px rgba(106, 48, 147, 0.12)';
            } else {
                nav.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }
});
    <script src="js/app-ui.js">