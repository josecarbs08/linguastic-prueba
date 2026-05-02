// ===== MÓDULO: Menú Móvil =====
// Maneja la apertura/cierre del menú en dispositivos móviles

class MobileMenu {
    constructor() {
        this.menu = document.getElementById('mobile-menu');
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.close = document.getElementById('mobile-menu-close');
        this.content = this.menu?.querySelector('.flex.flex-col.items-center');
        
        if (this.menu && this.toggle) this.init();
    }
    
    init() {
        this.attachEventListeners();
        console.log('✓ Mobile Menu Ready');
    }
    
    attachEventListeners() {
        this.toggle.addEventListener('click', () => this.open());
        if (this.close) this.close.addEventListener('click', () => this.closeMenu());
        
        // Cerrar al hacer click en un link
        this.menu.querySelectorAll('nav a, .open-registration').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Cerrar al hacer click fuera
        this.menu.addEventListener('click', (e) => {
            if (e.target === this.menu) this.closeMenu();
        });
    }
    
    open() {
        requestAnimationFrame(() => {
            this.menu.classList.remove('opacity-0', 'pointer-events-none');
            this.menu.classList.add('opacity-100');
            if (this.content) {
                this.content.classList.remove('opacity-0', 'translate-y-10');
                this.content.classList.add('opacity-100', 'translate-y-0');
            }
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeMenu() {
        this.menu.classList.add('opacity-0', 'pointer-events-none');
        this.menu.classList.remove('opacity-100');
        if (this.content) {
            this.content.classList.add('opacity-0', 'translate-y-10');
            this.content.classList.remove('opacity-100', 'translate-y-0');
        }
        document.body.style.overflow = '';
    }
}

window.MobileMenu = MobileMenu;
