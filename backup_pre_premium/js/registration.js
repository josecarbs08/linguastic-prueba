// ===== MÓDULO: Registro de Usuarios =====
// Maneja la lógica del formulario de registro y envío de datos al backend

class RegistrationHandler {
    constructor() {
        this.form = document.getElementById('registration-form');
        this.modal = document.getElementById('registration-modal');
        this.openButtons = document.querySelectorAll('.open-registration');
        this.closeBtn = document.getElementById('close-registration');
        this.content = document.getElementById('registration-content');
        
        this.langSelect = document.getElementById('reg-lang');
        this.levelSelect = document.getElementById('reg-level');
        this.daySelect = document.getElementById('reg-day');
        this.timeSelect = document.getElementById('reg-time');
        // Noticia/Curso pages might use different IDs or might not have all fields. 
        // We'll normalize them here if they exist.
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
        
        if (this.form && this.modal) this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.handleDeepLinks();
        console.log(`✓ Registration Handler Initialized (${this.openButtons.length} triggers)`);
    }
    
    attachEventListeners() {
        // Use event delegation for dynamically created buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-registration');
            if (btn) {
                e.preventDefault();
                this.openModal(e);
            }
        });
        
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        if (this.langSelect) this.langSelect.addEventListener('change', () => this.handleConditionalLogic());
        if (this.levelSelect) this.levelSelect.addEventListener('change', () => this.handleConditionalLogic());
        if (this.daySelect) this.daySelect.addEventListener('change', () => this.handleDayChange());
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    openModal(e) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        
        const btn = e?.currentTarget || e?.target?.closest('.open-registration');
        this.activeDiscount = btn?.dataset.descuento === "true";
        
        if (btn?.dataset) {
            // Mapping English names to the exact select values
            const cursoMap = {
                'Inglés': 'Inglés General',
                'ingles-basico': 'Inglés General',
                'ingles-intermedio': 'Inglés General',
                'ingles-avanzado': 'Inglés General',
                'kids-teens': 'Kids & Teens',
                'certificaciones': 'Certificaciones'
            };

            const levelMap = {
                'ingles-basico': 'Principiante',
                'ingles-intermedio': 'Intermedio',
                'ingles-avanzado': 'Avanzado'
            };

            if (btn.dataset.curso) {
                const mappedCurso = cursoMap[btn.dataset.curso] || btn.dataset.curso;
                if (this.langSelect) this.langSelect.value = mappedCurso;
                
                const mappedLevel = levelMap[btn.dataset.curso];
                if (mappedLevel && this.levelSelect) this.levelSelect.value = mappedLevel;
            }

            if (btn.dataset.nivel && this.levelSelect) this.levelSelect.value = btn.dataset.nivel;
            
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
            if (this.content) {
                this.content.classList.remove('translate-y-12', 'opacity-0');
                this.content.classList.add('translate-y-0', 'opacity-100');
            }
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeModal() {
        this.modal.classList.add('opacity-0', 'pointer-events-none');
        if (this.content) {
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
            this.openModal(null);
            if (this.langSelect) this.langSelect.value = 'Inglés General';
            if (this.levelSelect) this.levelSelect.value = 'Principiante';
            if (this.daySelect) {
                this.daySelect.value = 'Sábado';
                this.updateTimeOptions('Sábado', '09:00');
            }
            this.handleConditionalLogic();
        } else if (curso) {
            // Direct mock event for openModal
            this.openModal({ target: { dataset: { curso: curso } } });
        }

        if (name && document.getElementById('reg-name')) {
            document.getElementById('reg-name').value = name;
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
            
            // Enviar al backend seguro
            const response = await fetch(`${window.BACKEND_URL}/api/register`, {
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
            
            if (data.success) {
                console.log('✓ Registration synced to DB');
                
                // Pantalla de éxito premium
                const originalContentHtml = this.content.innerHTML;
                this.content.innerHTML = `
                    <div class="p-12 flex flex-col items-center text-center">
                        <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
                            <span translate="no" class="material-symbols-outlined text-green-500 text-6xl">check_circle</span>
                        </div>
                        <h3 class="text-4xl font-black text-primary mb-4 italic">¡Casi listo!</h3>
                        <p class="text-on-surface-variant font-medium mb-10 text-lg">Hemos recibido tus datos con éxito. Te estamos conectando con un asesor por WhatsApp para finalizar los detalles.</p>
                        <div class="w-full bg-primary/5 h-2 rounded-full overflow-hidden mb-4">
                            <div class="h-full bg-primary animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                `;

                // Generar mensaje para WhatsApp
                let message = `¡Hola! Soy ${name} y me gustaría inscribirme al curso de ${lang} ${level}`;
                if (day && time) message += ` los ${day}s a las ${time}.`;
                if (this.activeDiscount) message += ' (con descuento por promoción)';
                
                const encodedMessage = encodeURIComponent(message);
                
                setTimeout(() => {
                    window.open(`https://wa.me/5212384018618?text=${encodedMessage}`, '_blank');
                    this.closeModal();
                    // Restore after close for next time
                    setTimeout(() => { this.content.innerHTML = originalContentHtml; }, 500);
                    this.form.reset();
                }, 2000);
            } else {
                alert('Error: ' + (data.message || 'Intenta de nuevo'));
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error de conexión. Por favor intenta de nuevo.');
        } finally {
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }
    }
}

window.RegistrationHandler = RegistrationHandler;
