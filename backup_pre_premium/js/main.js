// ===== ARCHIVO PRINCIPAL DE INICIALIZACIÓN =====
// Combina todos los módulos de forma segura

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Lingüastic App Initializing...');
    
    // Configurar URL del backend (cambiar según ambiente)
    window.BACKEND_URL = window.BACKEND_URL || 'https://api.linguastic.net';
    console.log('Backend URL:', window.BACKEND_URL);
    
    // Desabilitar scroll restoration para scroll suave
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Inicializar módulos
    const carousel = new window.LanguageCarousel();
    const mobileMenu = new window.MobileMenu();
    const registration = new window.RegistrationHandler();
    const reviews = new window.ReviewCarousel();
    const scrollAnimations = new window.ScrollAnimations();
    
    console.log('✓ All modules initialized successfully');
    
    // Habilitar Google Analytics si está disponible
    if (typeof gtag === 'function') {
        window.trackEvent = (eventName, data) => {
            gtag('event', eventName, data);
        };
    }
});
