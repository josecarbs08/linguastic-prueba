// ===== MÓDULO: App UI Enhancements =====
// Maneja la notificación Toast y corrige el comportamiento de los dropdowns en desktop
class AppUI {
    constructor() {
        this.toast = document.getElementById('app-notification-toast');
        this.dropdownItems = document.querySelectorAll('.nav-item-with-dropdown');
        
        this.init();
    }
    
    init() {
        this.setupPageTransitions();
        this.setupDropdownFixes();
        this.setupToast();
        console.log('✓ App UI Enhancements Ready');
    }

    setupPageTransitions() {
        // Set initial state for page fade-in if not already visible
        if (document.body.style.opacity !== '1') {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease-out';
            
            // Trigger fade-in immediately
            const fadeIn = () => {
                document.body.style.opacity = '1';
            };

            // Use multiple triggers for reliability
            requestAnimationFrame(fadeIn);
            setTimeout(fadeIn, 50); // Safety fallback
        }

        // Trigger fade-out for internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            // Check if it's a valid internal link
            if (link && 
                link.href && 
                link.hostname === window.location.hostname && 
                !link.hash && 
                link.target !== '_blank' && 
                !link.hasAttribute('download') &&
                link.getAttribute('href') !== '#' &&
                !link.getAttribute('href').startsWith('javascript')
            ) {
                e.preventDefault();
                document.body.style.opacity = '0';
                
                // Navigate after the transition duration
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });

        // Fix white screen when using browser back button (bfcache)
        window.addEventListener('pageshow', (e) => {
            if (e.persisted || document.body.style.opacity === '0') {
                document.body.style.opacity = '1';
            }
        });
    }
    
    setupDropdownFixes() {
        // Click-to-toggle: clicking the trigger text opens/closes the dropdown
        this.dropdownItems.forEach(item => {
            const trigger = item.querySelector('.nav-dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isOpen = item.classList.contains('is-open');
                    // Close all other dropdowns first
                    this.dropdownItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('is-open');
                            other.classList.add('force-hide-dropdown');
                        }
                    });
                    if (isOpen) {
                        item.classList.remove('is-open');
                        item.classList.add('force-hide-dropdown');
                    } else {
                        item.classList.remove('force-hide-dropdown');
                        item.classList.add('is-open');
                    }
                });
            }

            // When mouse enters, clear force-hide so CSS :hover works
            item.addEventListener('mouseenter', () => {
                item.classList.remove('force-hide-dropdown');
            });

            // When mouse leaves, also remove is-open so it closes cleanly
            item.addEventListener('mouseleave', () => {
                item.classList.remove('is-open');
            });

            // Close dropdown when clicking internal links (navigation)
            const links = item.querySelectorAll('.mega-dropdown a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    item.classList.remove('is-open');
                    item.classList.add('force-hide-dropdown');
                    setTimeout(() => item.classList.remove('force-hide-dropdown'), 800);
                });
            });
        });

        // Close all dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item-with-dropdown')) {
                this.dropdownItems.forEach(item => {
                    item.classList.remove('is-open');
                });
            }
        });
    }
    
    setupToast() {
        // Only show if the toast exists on the page
        if (!this.toast) return;
        
        // Show the toast after 3 seconds of page load to catch user's attention
        setTimeout(() => {
            this.showToast();
        }, 3000);
    }
    
    showToast() {
        // Remove hiding classes and add interactive classes
        requestAnimationFrame(() => {
            this.toast.classList.remove('translate-y-[150%]', 'opacity-0');
            this.toast.classList.add('pointer-events-auto');
        });
    }
}

window.AppUI = AppUI;
