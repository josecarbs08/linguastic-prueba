
        // ===== CONFIGURACIÓN SEGURA DEL BACKEND =====
        // Define ANTES de que se cargue el HTML
        window.BACKEND_URL = ''; // En Vercel usamos rutas relativas (/api/...)

        document.addEventListener('DOMContentLoaded', () => {
            console.log('✓ Lingüastic App Initializing...');
            console.log('Backend URL:', window.BACKEND_URL);

            // Force scroll to top on refresh
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);

            // --- Mobile Menu ---
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenuClose = document.getElementById('mobile-menu-close');
            const mobileMenuContent = mobileMenu ? mobileMenu.querySelector('.flex.flex-col.items-center') : null;

            if (mobileMenuToggle && mobileMenu) {
                console.log('�S& Mobile Menu Elements Found');

                function openMenu() {
                    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                    mobileMenu.classList.add('opacity-100');
                    if (mobileMenuContent) {
                        mobileMenuContent.classList.remove('opacity-0', 'translate-y-10');
                        mobileMenuContent.classList.add('opacity-100', 'translate-y-0');
                    }
                    document.body.style.overflow = 'hidden';
                }

                function closeMenu() {
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                    mobileMenu.classList.remove('opacity-100');
                    if (mobileMenuContent) {
                        mobileMenuContent.classList.add('opacity-0', 'translate-y-10');
                        mobileMenuContent.classList.remove('opacity-100', 'translate-y-0');
                    }
                    document.body.style.overflow = '';
                }

                mobileMenuToggle.addEventListener('click', openMenu);
                if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

                // Close on link click
                mobileMenu.querySelectorAll('nav a, .open-registration').forEach(link => {
                    link.addEventListener('click', closeMenu);
                });

                // Close on backdrop click
                mobileMenu.addEventListener('click', (e) => {
                    const backdrop = mobileMenu.firstElementChild;
                    if (e.target === mobileMenu || e.target === backdrop) {
                        closeMenu();
                    }
                });

                // Expose for inline handlers
                window.openMenu = openMenu;
                window.closeMenu = closeMenu;
            } else {
                console.error('�R Mobile Menu Elements Missing');
            }

            // --- Desktop Dropdown UX ---
            const dropdownItems = document.querySelectorAll('.nav-item-with-dropdown');
            dropdownItems.forEach((item) => {
                const trigger = item.querySelector('.nav-dropdown-trigger');
                if (!trigger) return;

                trigger.setAttribute('role', 'button');
                trigger.setAttribute('tabindex', '0');
                trigger.setAttribute('aria-expanded', 'false');

                const openDropdown = () => {
                    dropdownItems.forEach((other) => {
                        if (other !== item) {
                            other.classList.remove('is-open');
                            const otherTrigger = other.querySelector('.nav-dropdown-trigger');
                            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                        }
                    });
                    item.classList.remove('force-hide-dropdown');
                    item.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                };

                const closeDropdown = () => {
                    item.classList.remove('is-open');
                    item.classList.add('force-hide-dropdown');
                    trigger.setAttribute('aria-expanded', 'false');
                };

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (item.classList.contains('is-open')) {
                        closeDropdown();
                    } else {
                        openDropdown();
                    }
                });

                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (item.classList.contains('is-open')) {
                            closeDropdown();
                        } else {
                            openDropdown();
                        }
                    }
                });

                item.addEventListener('mouseleave', () => {
                    closeDropdown();
                    // Once the mouse actually leaves, remove force-hide-dropdown
                    // so it can work correctly the next time they hover
                    setTimeout(() => item.classList.remove('force-hide-dropdown'), 50);
                });
                
                item.addEventListener('focusout', (e) => {
                    if (!item.contains(e.relatedTarget)) {
                        closeDropdown();
                        item.classList.remove('force-hide-dropdown');
                    }
                });
            });

            document.addEventListener('click', (e) => {
                dropdownItems.forEach((item) => {
                    if (!item.contains(e.target)) {
                        item.classList.remove('is-open');
                        const trigger = item.querySelector('.nav-dropdown-trigger');
                        if (trigger) trigger.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // --- Language Slider Architecture ---
            const slider = document.querySelector('.language-slider');
            const originalSlides = Array.from(document.querySelectorAll('.language-slide'));
            const dots = document.querySelectorAll('.lang-dot');
            const prevBtn = document.querySelector('.prev-slide');
            const nextBtn = document.querySelector('.next-slide');
            const videos = document.querySelectorAll('.lang-video');
            let currentSlide = 0;
            let slideTimer;

            function isMobile() {
                return window.innerWidth < 1024;
            }

            // Infinite loop helper
            function setupInfiniteLoop() {
                if (!slider || originalSlides.length < 2) return;

                // Clone first and last for seamless loop
                const firstClone = originalSlides[0].cloneNode(true);
                const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

                firstClone.classList.add('clone');
                lastClone.classList.add('clone');
                firstClone.classList.remove('active');

                slider.appendChild(firstClone);
                slider.insertBefore(lastClone, originalSlides[0]);

                if (isMobile()) {
                    // Initial position at first real slide
                    setTimeout(() => {
                        slider.scrollLeft = slider.offsetWidth;
                    }, 10);

                    slider.addEventListener('scroll', () => {
                        const width = slider.offsetWidth;
                        const scrollLeft = slider.scrollLeft;

                        // Silent Jump Logic
                        if (scrollLeft <= 2) {
                            slider.style.scrollBehavior = 'auto'; // Disable smooth for jump
                            slider.scrollLeft = width * originalSlides.length;
                            setTimeout(() => { if (isMobile()) slider.style.scrollBehavior = 'smooth'; }, 50);
                        } else if (scrollLeft >= width * (originalSlides.length + 1) - 2) {
                            slider.style.scrollBehavior = 'auto'; // Disable smooth for jump
                            slider.scrollLeft = width;
                            setTimeout(() => { if (isMobile()) slider.style.scrollBehavior = 'smooth'; }, 50);
                        }

                        // Update dots (adjust for clone at index 0)
                        const realIndex = Math.round(slider.scrollLeft / width) - 1;
                        const normalizedIndex = (realIndex + originalSlides.length) % originalSlides.length;

                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === normalizedIndex);
                        });
                        currentSlide = normalizedIndex;
                    });
                }
            }

            function showSlide(index) {
                if (isMobile()) {
                    // Calculate target based on clones (index 1 is the first real slide)
                    const targetIndex = index + 1;
                    const allSlidesIncludingClones = slider.querySelectorAll('.language-slide');
                    const targetSlide = allSlidesIncludingClones[targetIndex];

                    if (targetSlide) {
                        slider.scrollTo({
                            left: targetSlide.offsetLeft - slider.offsetLeft,
                            behavior: 'smooth'
                        });
                    }
                    return;
                }

                videos.forEach(v => v.pause());
                const allSlidesIncludingClones = slider.querySelectorAll('.language-slide');
                allSlidesIncludingClones.forEach(s => s.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active'));

                currentSlide = (index + originalSlides.length) % originalSlides.length;

                // On desktop we only care about the original slides
                originalSlides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');

                resetTimer();
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
                // Track carousel navigation
                if (typeof trackEvent === 'function') {
                    trackEvent('carousel_next', { slide: currentSlide });
                }
            }
            function prevSlide() {
                showSlide(currentSlide - 1);
                // Track carousel navigation
                if (typeof trackEvent === 'function') {
                    trackEvent('carousel_prev', { slide: currentSlide });
                }
            }

            function resetTimer() {
                clearInterval(slideTimer);
                slideTimer = setInterval(() => {
                    const isAnyVideoPlaying = Array.from(videos).some(v => !v.paused && !v.ended);
                    if (!isAnyVideoPlaying) nextSlide();
                }, 7000);
            }

            // Expose for inline handlers used in menu/buttons
            window.goToLang = (index) => { if(slider) showSlide(Number(index) || 0); };
            window.nextLang = () => { if(slider) nextSlide(); };
            window.prevLang = () => { if(slider) prevSlide(); };

            setupInfiniteLoop();

            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (slider) {
                dots.forEach((dot, i) => {
                    dot.addEventListener('click', () => {
                        if (isMobile()) {
                            // All slides list includes clones. Real slides start at index 1.
                            const targetSlide = slider.querySelectorAll('.language-slide')[i + 1];
                            if (targetSlide) {
                                slider.scrollTo({
                                    left: targetSlide.offsetLeft - slider.offsetLeft,
                                    behavior: 'smooth'
                                });
                            }
                        } else {
                            showSlide(i);
                        }
                    });
                });
            }

            // Initialize first slide state
            if (slider && !isMobile()) showSlide(0);

            // Play/Pause & Audio Toggle Logic (Event Delegation for clones)
            if (slider) {
                slider.addEventListener('click', (e) => {
                    const container = e.target.closest('.lang-vid-container');
                    if (!container) return;

                    const video = container.querySelector('video');
                    const btn = container.querySelector('.audio-toggle-btn');
                    const icon = btn ? btn.querySelector('.material-symbols-outlined') : null;

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
                });

                // Hover effects (Clones need this too)
                slider.addEventListener('mouseover', (e) => {
                    const container = e.target.closest('.lang-vid-container');
                    if (!container) return;
                    const video = container.querySelector('video');
                    const btn = container.querySelector('.audio-toggle-btn');
                    if (video && !video.paused && btn) btn.classList.remove('opacity-0');
                });

                slider.addEventListener('mouseout', (e) => {
                    const container = e.target.closest('.lang-vid-container');
                    if (!container) return;
                    const video = container.querySelector('video');
                    const btn = container.querySelector('.audio-toggle-btn');
                    if (video && !video.paused && btn) btn.classList.add('opacity-0');
                });

                // Auto-play control: Pause on interaction
                const pauseAuto = () => clearInterval(slideTimer);
                const resumeAuto = () => resetTimer();

                slider.addEventListener('mouseenter', pauseAuto);
                slider.addEventListener('mouseleave', resumeAuto);
                slider.addEventListener('touchstart', pauseAuto, { passive: true });
                slider.addEventListener('touchend', resumeAuto, { passive: true });
            }

            // Timer is already initialized inside showSlide(0) above � no duplicate needed

            // --- Registration Modal ---
            const regModal = document.getElementById('registration-modal');
            const openRegButtons = document.querySelectorAll('.open-registration');
            const closeRegButton = document.getElementById('close-registration');
            const regContent = document.getElementById('registration-content');
            let activeDiscount = false;

            if (regModal && openRegButtons.length > 0) {
                console.log(`�S& Registration Modal Ready (${openRegButtons.length} buttons found)`);

                function openReg(e) {
                    if (e) e.preventDefault();

                    // Track registration modal open
                    if (typeof trackEvent === 'function') {
                        trackEvent('registration_modal_opened', {
                            timestamp: new Date().toISOString()
                        });
                    }

                    // Pre-fill logic from dataset
                    const btn = e ? e.currentTarget : null;
                    activeDiscount = btn && btn.dataset.descuento === "true";

                    if (btn && btn.dataset) {
                        if (btn.dataset.curso) langSelect.value = btn.dataset.curso;
                        if (btn.dataset.nivel) levelSelect.value = btn.dataset.nivel;
                        if (btn.dataset.dia) {
                            daySelect.value = btn.dataset.dia;
                            updateTimeOptions(btn.dataset.dia);
                        }
                        if (btn.dataset.hora) {
                            timeSelect.value = btn.dataset.hora;
                        }

                        // Handle special logic if preset
                        handleConditionalLogic();
                    }

                    requestAnimationFrame(() => {
                        regModal.classList.remove('opacity-0', 'pointer-events-none');
                        if (regContent) {
                            regContent.classList.remove('translate-y-12');
                            regContent.classList.add('translate-y-0');
                        }
                    });
                    document.body.style.overflow = 'hidden';
                }

                function closeReg() {
                    regModal.classList.add('opacity-0', 'pointer-events-none');
                    if (regContent) {
                        regContent.classList.add('translate-y-12');
                        regContent.classList.remove('translate-y-0');
                    }
                    document.body.style.overflow = '';
                }

                openRegButtons.forEach(btn => btn.addEventListener('click', openReg));
                if (closeRegButton) closeRegButton.addEventListener('click', closeReg);
                regModal.addEventListener('click', (e) => {
                    if (e.target === regModal) closeReg();
                });
            } else {
                console.error('�R Registration Modal Elements Missing');
            }

            // --- Form Submission to WhatsApp ---
            const form = document.getElementById('registration-form');
            const langSelect = document.getElementById('reg-lang');
            const levelSelect = document.getElementById('reg-level');
            const daySelect = document.getElementById('reg-day');
            const timeSelect = document.getElementById('reg-time');
            const engInfo = document.getElementById('english-beginner-info');

            // Dynamic hours
            const hoursByDay = {
                'Lunes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                'Martes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                'Miércoles': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                'Jueves': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
                'Viernes': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
                'Sábado': ['09:00', '10:00', '11:00', '12:00', '13:00']
            };

            function updateTimeOptions(day, autoSelect = null) {
                timeSelect.innerHTML = '<option value="" disabled selected>Selecciona hora</option>';
                if (hoursByDay[day]) {
                    hoursByDay[day].forEach(h => {
                        const opt = document.createElement('option');
                        opt.value = h;
                        opt.textContent = `${h} hrs`;
                        if (autoSelect === h) opt.selected = true;
                        timeSelect.appendChild(opt);
                    });
                    timeSelect.disabled = false;
                }
            }

            function handleConditionalLogic() {
                const lang = langSelect.value;
                const level = levelSelect.value;
                const day = daySelect.value;

                if (lang === 'Inglés General' && level === 'Principiante') {
                    // Only show banner if day is either unselected or specifically Saturday
                    if (!day || day === 'Sábado') {
                        engInfo.classList.remove('hidden');
                    } else {
                        engInfo.classList.add('hidden');
                    }

                    // Only auto-fill Saturday 09:00 if it was manually triggered by deep link
                    // (Deep linking handles it differently, so we just react to day selection here)
                } else {
                    engInfo.classList.add('hidden');
                }
            }

            langSelect.addEventListener('change', handleConditionalLogic);
            levelSelect.addEventListener('change', handleConditionalLogic);

            daySelect.addEventListener('change', () => {
                const lang = langSelect.value;
                const level = levelSelect.value;
                const day = daySelect.value;

                // Si es Inglés Principiante y selecciona Sábado, auto-completar las 09:00 hrs
                if (lang === 'Inglés General' && level === 'Principiante' && day === 'Sábado') {
                    updateTimeOptions(day, '09:00');
                } else {
                    updateTimeOptions(day);
                }

                handleConditionalLogic();
            });

            // Enable 'Enter' to submit from any field
            form.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    const target = e.target;
                    // Only trigger if focus is on form elements and not already on the submit button
                    if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
                        e.preventDefault();
                        form.requestSubmit();
                    }
                }
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('reg-name').value;
                const lang = langSelect.value;
                const level = levelSelect.value;
                const day = daySelect.value;
                const time = timeSelect.value;
                const btnSubmit = form.querySelector('button[type="submit"]');
                const originalText = btnSubmit.innerHTML;

                try {
                    btnSubmit.innerHTML = '<span translate="no" class="material-symbols-outlined animate-spin align-middle mr-2">refresh</span> Guardando...';
                    btnSubmit.disabled = true;

                    // 1. Enviar datos al backend seguro
                    try {
                        const response = await fetch(`${window.BACKEND_URL}/api/register`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nombre: name,
                                idioma: lang,
                                nivel: level,
                                dia: day,
                                hora: time
                            })
                        });

                        const data = await response.json();

                        if (data.success) {
                            console.log('✅ Registration synced to DB');
                            // Track successful registration
                            if (typeof trackEvent === 'function') {
                                trackEvent('registration_submitted', {
                                    idioma: lang,
                                    nivel: level,
                                    dia: day,
                                    hora: time,
                                    source: 'web'
                                });
                            }
                        } else {
                            console.warn('⚠️ Backend error:', data.error);
                        }
                    } catch (backendError) {
                        console.warn('⚠️ Backend request failed:', backendError.message);
                        // Continuar con WhatsApp aunque falle el backend
                    }

                    // 2. Mostrar pantalla de éxito premium
                    const modalContent = form.parentElement;
                    const originalContent = modalContent.innerHTML;
                    
                    modalContent.innerHTML = `
                        <div class="flex flex-col items-center justify-center py-12 text-center">
                            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <span translate="no" class="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
                            </div>
                            <h3 class="text-2xl font-black text-primary mb-2">¡Casi listo, ${name || ''}!</h3>
                            <p class="text-on-surface-variant mb-8 px-4">Hemos registrado tu interés. Te estamos redirigiendo a WhatsApp para finalizar tu inscripción...</p>
                            <div class="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div class="h-full bg-primary origin-left"></div>
                            </div>
                        </div>
                    `;

                    // 3. Redirección directa a WhatsApp (Evita bloqueos de ventanas emergentes)
                    let message = '';
                    const discountText = activeDiscount ? ' ¡Además, vengo por el descuento de la página!' : '';
                    if (lang === 'Inglés General' && level === 'Principiante' && day === 'Sábado' && time === '09:00') {
                        message = `¡Hola! Soy ${name} y me gustaría inscribirme al nuevo curso de Inglés Principiante de los sábados de 09:00 AM a 01:00 PM.${discountText}`;
                    } else {
                        const isNewGroup = (lang === 'Inglés General' && level === 'Principiante') ? ' Me interesa también la inscripción especial del curso del 25 de Abril.' : '';
                        message = `¡Hola! Soy ${name} y me gustaría inscribirme en Lingüastic. Me interesa el idioma ${lang} en nivel ${level}. Mi disponibilidad es para el día ${day} a las ${time} hrs.${isNewGroup}${discountText}`;
                    }

                    // Redirigir inmediatamente después de mostrar el mensaje de éxito
                    window.location.href = `https://wa.me/5212384018618?text=${encodeURIComponent(message)}`;
                    
                    // Limpieza en segundo plano (por si el usuario regresa a la pestaña)
                    setTimeout(() => {
                        closeReg();
                        setTimeout(() => { modalContent.innerHTML = originalContent; }, 500);
                    }, 1000);

                } catch (err) {
                    console.error('❌ Submission Exception:', err);
                    window.open(`https://wa.me/5212384018618?text=Error en registro web para ${name}`, '_blank');
                } finally {
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.disabled = false;
                }
            });

            // --- Deep Link Integration ---
            function checkDeepLinks() {
                const urlParams = new URLSearchParams(window.location.search);
                const promo = urlParams.get('promo');
                const curso = urlParams.get('curso');
                const name = urlParams.get('nombre');

                if (promo === 'sabado' || promo === 'nuevo-grupo') {
                    console.log('�x Promo link detected:', promo);

                    if (regModal.classList.contains('opacity-0')) {
                        openReg();
                    }

                    if (name) {
                        const nameInput = document.getElementById('reg-name');
                        if (nameInput) nameInput.value = name;
                    }

                    langSelect.value = 'Inglés General';
                    levelSelect.value = 'Principiante';
                    daySelect.value = 'Sábado';
                    updateTimeOptions('Sábado', '09:00');
                    handleConditionalLogic();

                    history.replaceState(null, null, window.location.pathname);
                } else if (curso || name) {
                    console.log('�x Deep link detected:', { curso, name });

                    // Open modal if not open
                    if (regModal.classList.contains('opacity-0')) {
                        openReg();
                    }

                    if (name) {
                        const nameInput = document.getElementById('reg-name');
                        if (nameInput) nameInput.value = name;
                    }

                    if (curso) {
                        const cursoLower = curso.toLowerCase();
                        if (cursoLower === 'ingles-p' || cursoLower === 'ingles-principiante') {
                            langSelect.value = 'Inglés General';
                            levelSelect.value = 'Principiante';

                            // Auto-select Saturday 09:00 only if it came specifically from the button
                            const btn = Array.from(openRegButtons).find(b => b.dataset.curso === 'Inglés General');
                            if (btn && btn.dataset.dia === 'Sábado') {
                                daySelect.value = 'Sábado';
                                updateTimeOptions('Sábado', '09:00');
                            }

                            handleConditionalLogic();
                        } else if (cursoLower === 'frances' || cursoLower === 'frances-a1') {
                            langSelect.value = 'Business English';
                        } else if (cursoLower === 'aleman' || cursoLower === 'aleman-ejecutivo') {
                            langSelect.value = 'Certificaciones';
                        }
                    }

                    // Clear search params to avoid re-triggering and keeping URL clean
                    history.replaceState(null, null, window.location.pathname);
                }
            }

            // Check for deep links on load
            window.addEventListener('load', checkDeepLinks);

            // --- Clean URL Navigation (No hashes in URL) ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                        
                        // Update URL without hash
                        window.history.pushState(null, null, window.location.pathname);
                    }
                });
            });

            // --- Hash Cleanup for better UX ---
            window.addEventListener('load', () => {
                if (window.location.hash === '#footer') {
                    const footer = document.getElementById('footer');
                    if (footer) {
                        footer.scrollIntoView();
                        history.replaceState(null, null, window.location.pathname);
                    }
                }
            });

            // --- Infinite Google Reviews Carousel (Buttery Smooth) ---
            const track = document.getElementById('reviews-track');
            const viewport = document.querySelector('.reviews-viewport');
            const prevReviewBtn = document.getElementById('prev-review');
            const nextReviewBtn = document.getElementById('next-review');

            if (track && viewport) {
                const originalCards = Array.from(track.children);
                const totalOriginals = originalCards.length;

                // Multi-cloning for truly infinite scroll in both directions
                // Infinite loop cloning - Corrected to avoid adjacent twins
                // We add one full set before and one full set after
                const clonesCount = 2; // Total of 3 sets including original
                
                for (let i = 0; i < clonesCount; i++) {
                    // Suffix: Append to end
                    originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
                    
                    // Prefix: Prepend to beginning (preserving order)
                    const prefixFragment = document.createDocumentFragment();
                    originalCards.forEach(card => prefixFragment.appendChild(card.cloneNode(true)));
                    track.insertBefore(prefixFragment, track.firstChild);
                }

                let currentIndex = totalOriginals; // Start at the first original in the middle
                let isTransitioning = false;
                let carouselInterval;
                let resumeTimeout;
                let transitionTimeout;

                // Set initial position immediately (no transition)
                function setInitialPosition() {
                    const cardWidth = getCardWidth();
                    track.style.transition = 'none';
                    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                }
                setInitialPosition();

                function getCardWidth() {
                    const firstCard = track.children[0];
                    if (!firstCard) return 0;
                    const trackStyle = window.getComputedStyle(track);
                    const gap = parseFloat(trackStyle.gap) || 0;
                    return firstCard.offsetWidth + gap;
                }

                function slideTo(index, instant = false) {
                    const cardWidth = getCardWidth();
                    // "chill" feel: snappier but smooth transition
                    track.style.transition = instant ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                    track.style.transform = `translateX(-${index * cardWidth}px)`;
                }

                function moveSlide(direction) {
                    if (isTransitioning) return;
                    isTransitioning = true;

                    if (direction === 'next') {
                        currentIndex++;
                    } else {
                        currentIndex--;
                    }

                    slideTo(currentIndex);

                    // Safety Fallback: Reset isTransitioning if transition fails/stalls
                    clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        if (isTransitioning) {
                            handleReset({ target: track });
                        }
                    }, 1000); // Slightly more than 0.8s transition

                    function handleReset(e) {
                        if (e && e.target !== track) return;
                        track.removeEventListener('transitionend', handleReset);
                        clearTimeout(transitionTimeout);

                        // Seamless Loop logic for both ends
                        if (currentIndex >= totalOriginals * 2) {
                            currentIndex = totalOriginals;
                            slideTo(currentIndex, true);
                        } else if (currentIndex < totalOriginals) {
                            currentIndex = totalOriginals * 2 - 1;
                            slideTo(currentIndex, true);
                        }
                        isTransitioning = false;
                    }

                    track.addEventListener('transitionend', handleReset);
                }

                function start() {
                    stop();
                    carouselInterval = setInterval(() => moveSlide('next'), 4000); // 4 seconds
                }

                function stop() {
                    clearInterval(carouselInterval);
                    clearTimeout(resumeTimeout);
                }

                function startDelayed(delay = 2000) {
                    stop();
                    resumeTimeout = setTimeout(() => {
                        moveSlide('next');
                        start();
                    }, delay);
                }

                // Initial Start
                start();

                // Navigation Controls
                if (prevReviewBtn) prevReviewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (isTransitioning) return;
                    stop();
                    moveSlide('prev');
                    startDelayed(4000);
                });
                if (nextReviewBtn) nextReviewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (isTransitioning) return;
                    stop();
                    moveSlide('next');
                    startDelayed(4000);
                });

                // Interaction: Pause on hover/touch
                viewport.addEventListener('mouseenter', stop);
                viewport.addEventListener('mouseleave', () => startDelayed(2000)); // Resume 2s after release

                viewport.addEventListener('touchstart', stop, { passive: true });
                viewport.addEventListener('touchend', () => startDelayed(2000), { passive: true });

                // Resize Handling
                window.addEventListener('resize', () => slideTo(currentIndex, true));

                // Initial State
                slideTo(currentIndex, true);
            }

            // --- German Video Specific Logic ---
            const germanVideo = document.getElementById('german-video');
            const playGermanBtn = document.getElementById('play-german-btn');

            if (germanVideo) {
                // Pre-set audio defaults
                germanVideo.muted = false;
                germanVideo.volume = 1.0;

                // Ensure audio is activated on interaction
                if (playGermanBtn) {
                    playGermanBtn.addEventListener('click', () => {
                        germanVideo.muted = false;
                        germanVideo.volume = 1.0;
                        console.log("�x` Audio manually activated on German video");
                    });
                }
            }
        });
    