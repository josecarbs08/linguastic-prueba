// ===== MÓDULO: Registro de Usuarios =====
// Maneja la lógica del formulario de registro y envío de datos al backend

class RegistrationHandler {
    constructor() {
        this.form = document.getElementById('registration-form');
        this.modal = document.getElementById('registration-modal');
        this.openButtons = document.querySelectorAll('.open-registration');
        this.closeBtn = document.getElementById('close-registration');
        this.content = document.getElementById('registration-content') || document.getElementById('registration-card');
        
        this.langSelect = document.getElementById('reg-lang');
        this.levelSelect = document.getElementById('reg-level');
        this.daySelect = document.getElementById('reg-day');
        this.timeSelect = document.getElementById('reg-time');
        
        if (!this.langSelect) this.langSelect = document.getElementById('reg-programa');

        this.engInfo = document.getElementById('english-beginner-info');
        
        this.timeOptions = {
            'Lunes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            'Martes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            'Miércoles': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            'Jueves': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
            'Viernes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            'Sábado': ['09:00', '10:00', '11:00', '12:00', '13:00']
        };
        
        this.activeDiscount = false;
        
        if (this.form && this.modal) {
            this.init();
        } else {
            console.log("Registration elements not fully present. RegistrationHandler initialized without attaching form logic.");
            this.attachOpenButtonsLogic();
            this.handleDeepLinks(); // Still check deep links (might need to redirect)
        }
    }
    
    init() {
        this.attachEventListeners();
        this.handleDeepLinks();
        console.log(`✅ Registration Handler Initialized (${this.openButtons.length} triggers)`);
    }

    attachOpenButtonsLogic() {
        // Just in case form is not on the page, but buttons are
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-registration');
            if (btn) {
                // Not on index page, we need to redirect or handle it
                e.preventDefault();
                const curso = btn.dataset.curso || '';
                const discount = btn.dataset.descuento === "true" ? '&promo=true' : '';
                window.location.href = `/?curso=${curso}${discount}`; // Redirect to home with params to open modal
            }
        });
    }
    
    attachEventListeners() {
        // Use event delegation for dynamically created buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-registration');
            if (btn && this.modal) {
                e.preventDefault();
                this.openModal(e);
            }
        });
        
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }
        
        if (this.langSelect) this.langSelect.addEventListener('change', () => this.handleConditionalLogic());
        if (this.levelSelect) this.levelSelect.addEventListener('change', () => this.handleConditionalLogic());
        if (this.daySelect) this.daySelect.addEventListener('change', () => this.handleDayChange());
        
        if (this.form) {
            this.form.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    const target = e.target;
                    if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
                        e.preventDefault();
                        this.form.requestSubmit();
                    }
                }
            });
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    openModal(e) {
        if (!this.modal) return;
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        
        if (typeof trackEvent === 'function') {
            trackEvent('registration_modal_opened', { timestamp: new Date().toISOString() });
        }

        const btn = (e?.target && e.target.closest('.open-registration')) || e?.currentTarget;
        this.activeDiscount = btn?.dataset?.descuento === "true";
        
        if (btn?.dataset) {
            const cursoMap = {
                'Inglés': 'Inglés General',
                'ingles-basico': 'Inglés General',
                'ingles-intermedio': 'Inglés General',
                'ingles-avanzado': 'Inglés General',
                'business-english': 'Business English',
                'certificaciones': 'Certificaciones',
                'italiano': 'Italiano',
                'frances': 'Francés',
                'aleman': 'Alemán'
            };

            const levelMap = {
                'ingles-basico': 'Principiante',
                'ingles-intermedio': 'Intermedio',
                'ingles-avanzado': 'Avanzado',
                'principiante': 'Principiante',
                'intermedio': 'Intermedio',
                'avanzado': 'Avanzado'
            };

            if (btn.dataset.curso) {
                const mappedCurso = cursoMap[btn.dataset.curso.toLowerCase()] || cursoMap[btn.dataset.curso] || btn.dataset.curso;
                if (this.langSelect) this.langSelect.value = mappedCurso;
                
                const mappedLevel = levelMap[btn.dataset.curso.toLowerCase()];
                if (mappedLevel && this.levelSelect) this.levelSelect.value = mappedLevel;
            }

            if (btn.dataset.nivel && this.levelSelect) {
                const mappedLevel = levelMap[btn.dataset.nivel.toLowerCase()] || btn.dataset.nivel;
                this.levelSelect.value = mappedLevel;
            }
            
            if (btn.dataset.dia && this.daySelect) {
                this.daySelect.value = btn.dataset.dia;
                this.updateTimeOptions(btn.dataset.dia, btn.dataset.hora);
            } else if (btn.dataset.hora && this.timeSelect) {
                 this.timeSelect.value = btn.dataset.hora;
            }
        }
        
        this.handleConditionalLogic();
        
        requestAnimationFrame(() => {
            this.modal.classList.remove('opacity-0', 'pointer-events-none');
            
            const overlay = document.getElementById('registration-overlay');
            if (overlay) overlay.classList.remove('opacity-0');
            
            const card = document.getElementById('registration-card');
            if (card) {
                card.classList.remove('translate-y-12', 'opacity-0');
                card.classList.add('translate-y-0', 'opacity-100');
            }
            
            if (this.content && this.content !== card) {
                this.content.classList.remove('translate-y-12', 'opacity-0');
                this.content.classList.add('translate-y-0', 'opacity-100');
            }
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeModal() {
        if (!this.modal) return;
        this.modal.classList.add('opacity-0', 'pointer-events-none');
        
        const overlay = document.getElementById('registration-overlay');
        if (overlay) overlay.classList.add('opacity-0');
        
        const card = document.getElementById('registration-card');
        if (card) {
            card.classList.add('translate-y-12', 'opacity-0');
            card.classList.remove('translate-y-0', 'opacity-100');
        }
        
        if (this.content && this.content !== card) {
            this.content.classList.add('translate-y-12', 'opacity-0');
            this.content.classList.remove('translate-y-0', 'opacity-100');
        }
        document.body.style.overflow = '';
    }
    
    updateTimeOptions(day, preselectedTime = null) {
        if (!this.timeSelect) return;
        
        const options = this.timeOptions[day] || [];
        this.timeSelect.innerHTML = `<option value="" disabled selected>Selecciona hora</option>`;
        
        options.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = `${time} hrs`;
            this.timeSelect.appendChild(option);
        });
        
        this.timeSelect.disabled = options.length === 0;
        
        if (preselectedTime && options.includes(preselectedTime)) {
            this.timeSelect.value = preselectedTime;
        }
    }
    
    handleDayChange() {
        const day = this.daySelect?.value;
        const lang = this.langSelect?.value;
        const level = this.levelSelect?.value;
        
        this.updateTimeOptions(day);
        
        if (lang === 'Inglés General' && level === 'Principiante' && day === 'Sábado') {
            this.updateTimeOptions(day, '09:00');
        }
        
        this.handleConditionalLogic();
    }
    
    handleConditionalLogic() {
        if (!this.langSelect || !this.levelSelect || !this.engInfo) return;
        
        const lang = this.langSelect.value;
        const level = this.levelSelect.value;
        const day = this.daySelect?.value;
        
        if (lang === 'Inglés General' && level === 'Principiante') {
            if (!day || day === 'Sábado') {
                this.engInfo.classList.remove('hidden');
            } else {
                this.engInfo.classList.add('hidden');
            }
        } else {
            this.engInfo.classList.add('hidden');
        }
    }
    
    handleDeepLinks() {
        const params = new URLSearchParams(window.location.search);
        const promo = params.get('promo');
        const curso = params.get('curso') || params.get('id'); // Support both
        const name = params.get('name') || params.get('nombre');
        
        if (promo === 'sabado' || promo === 'nuevo-grupo') {
            this.activeDiscount = true;
            if (this.modal) this.openModal(null);
            if (this.langSelect) this.langSelect.value = 'Inglés General';
            if (this.levelSelect) this.levelSelect.value = 'Principiante';
            if (this.daySelect) {
                this.daySelect.value = 'Sábado';
                this.updateTimeOptions('Sábado', '09:00');
            }
            this.handleConditionalLogic();
        } else if (curso) {
            if (this.modal) {
                // Direct mock event for openModal
                this.openModal({ target: { dataset: { curso: curso } } });
            } else {
                 console.log("Deep link detected, but no modal. Deferring to redirect logic if button is clicked.");
            }
        }

        if (name && document.getElementById('reg-name')) {
            document.getElementById('reg-name').value = name;
        }

        if (promo || curso || name) {
            if (window.history.replaceState) {
                // Clear URL parameters for cleaner URL
                const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path:url}, '', url);
            }
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email')?.value || '';
        const phone = document.getElementById('reg-phone')?.value || '';
        const lang = this.langSelect.value;
        const level = this.levelSelect.value;
        const day = this.daySelect.value;
        const time = this.timeSelect.value;
        const btnSubmit = this.form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        
        try {
            btnSubmit.innerHTML = '<span translate="no" class="material-symbols-outlined animate-spin align-middle mr-2">refresh</span> Guardando...';
            btnSubmit.disabled = true;
            
            // Send to secure backend
            try {
                const response = await fetch(`${window.BACKEND_URL || ''}/api/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: name,
                        correo: email,
                        telefonowhatsapp: phone,
                        idioma: lang,
                        nivel: level,
                        dia: day,
                        hora: time,
                        descuento: this.activeDiscount
                    })
                });
                const data = await response.json();
                if (data.success && typeof trackEvent === 'function') {
                    trackEvent('registration_submitted', { idioma: lang, nivel: level, dia: day, hora: time, source: 'web' });
                }
            } catch (err) {
                console.warn('Backend request failed:', err.message);
                // Continue to WhatsApp anyway
            }
            
            // Premium Success Screen
            const originalContentHtml = this.content.innerHTML;
            this.content.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center h-full min-h-[300px]">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <span translate="no" class="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
                    </div>
                    <h3 class="text-2xl font-black text-primary mb-2">¡Casi listo, ${name || ''}!</h3>
                    <p class="text-on-surface-variant mb-8 px-4">Hemos registrado tu interés. Te estamos redirigiendo a WhatsApp para finalizar tu inscripción...</p>
                    <div class="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-primary animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
            `;

            // WhatsApp Redirection
            let message = '';
            const discountText = this.activeDiscount ? ' ¡Además, vengo por el descuento de la página!' : '';
            if (lang === 'Inglés General' && level === 'Principiante' && day === 'Sábado' && time === '09:00') {
                message = `¡Hola! Soy ${name} y me gustaría inscribirme al nuevo curso de Inglés Principiante de los sábados de 09:00 AM a 01:00 PM.${discountText}`;
            } else {
                const isNewGroup = (lang === 'Inglés General' && level === 'Principiante') ? ' Me interesa también la inscripción especial.' : '';
                message = `¡Hola! Soy ${name} y me gustaría inscribirme en Lingüastic. Me interesa el idioma ${lang} en nivel ${level}. Mi disponibilidad es para el día ${day} a las ${time} hrs.${isNewGroup}${discountText}`;
            }
            
            const encodedMessage = encodeURIComponent(message);
            
            setTimeout(() => {
                window.location.href = `https://wa.me/5212384018618?text=${encodedMessage}`;
                
                // Cleanup in background in case user returns to tab
                setTimeout(() => {
                    this.closeModal();
                    setTimeout(() => { this.content.innerHTML = originalContentHtml; }, 500);
                    this.form.reset();
                }, 1000);
            }, 1500);
            
        } catch (error) {
            console.error('Submission error:', error);
            window.location.href = `https://wa.me/5212384018618?text=Hola, quiero inscribirme a ${lang} pero hubo un error en la web.`;
        } finally {
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }
    }
}

// Inicializar globalmente
document.addEventListener('DOMContentLoaded', () => {
    window.registrationHandler = new RegistrationHandler();
});