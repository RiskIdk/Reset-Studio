// ==================== SCRIPT MEJORADO CON ANIMACIONES ==================== 
// Agregar este código al final de tu script.js existente

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Reset Studio - Animaciones cargadas');
    
    // ==================== INTERSECTION OBSERVER PARA ANIMACIONES ====================
    const scrollObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es un campaign-layout, también animar sus hijos
                if (entry.target.classList.contains('campaign-layout')) {
                    animateCampaignChildren(entry.target);
                }
            }
        });
    }, scrollObserverOptions);

    // ==================== ELEMENTOS A ANIMAR ====================
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, ' +
        '.motion-video-item, ' +
        '.gallery-img-item, ' +
        '.valla-item, ' +
        '.brand-hero-image-wrapper, ' +
        '.client-info-item, ' +
        '.brand-title-main, ' +
        '.brand-description-main, ' +
        '.campaign-layout, ' +
        '[data-scroll-reveal]'
    );

    elementsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });

    console.log(`✨ ${elementsToAnimate.length} elementos con animación detectados`);

    // ==================== ANIMACIÓN ESPECIAL PARA CAMPAÑAS ====================
    function animateCampaignChildren(campaignLayout) {
        // Animar logo
        const logo = campaignLayout.querySelector('.campaign-logo-container');
        if (logo) {
            setTimeout(() => logo.classList.add('visible'), 200);
        }
        
        // Animar meta items
        const metaItems = campaignLayout.querySelectorAll('.campaign-meta-item');
        metaItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('visible'), 300 + (index * 100));
        });
        
        // Animar descripción
        const description = campaignLayout.querySelector('.campaign-description');
        if (description) {
            setTimeout(() => description.classList.add('visible'), 700);
        }
        
        // Animar imágenes
        const images = campaignLayout.querySelectorAll('.campaign-image-item');
        images.forEach((img, index) => {
            setTimeout(() => img.classList.add('visible'), 800 + (index * 100));
        });
    }

    // ==================== LIGHTBOX MEJORADO ====================
    const lightbox = document.getElementById('vallasLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevValla');
    const nextBtn = document.getElementById('nextValla');
    const vallaItems = document.querySelectorAll('.valla-item');
    
    if (lightbox && vallaItems.length > 0) {
        let currentIndex = 0;
        const totalVallas = vallaItems.length;
        
        // Array de imágenes
        const vallaImages = Array.from(vallaItems).map(item => {
            return item.querySelector('img').src;
        });
        
        // Función para abrir lightbox
        function openLightbox(index) {
            currentIndex = index;
            updateLightboxImage();
            document.body.classList.add('lightbox-active');
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Función para cerrar lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-active');
            document.body.style.overflow = '';
        }
        
        // Función para actualizar imagen
        function updateLightboxImage() {
            lightboxImage.classList.remove('loaded');
            setTimeout(() => {
                lightboxImage.src = vallaImages[currentIndex];
                lightboxCounter.textContent = `${currentIndex + 1} / ${totalVallas}`;
                lightboxImage.onload = function() {
                    lightboxImage.classList.add('loaded');
                };
            }, 150);
        }
        
        // Navegación
        function prevImage() {
            currentIndex = (currentIndex - 1 + totalVallas) % totalVallas;
            updateLightboxImage();
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % totalVallas;
            updateLightboxImage();
        }
        
        // Event listeners
        vallaItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
        
        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', closeLightbox);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }
        
        // Cerrar con click en overlay
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });
        
        console.log('🖼️ Lightbox configurado');
    }

    // ==================== HOVER EFFECTS PARA PROJECT CARDS ====================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ==================== VIDEO PLACEHOLDER INTERACTION ====================
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            console.log('Video clicked - Aquí irá tu video cuando lo agregues');
            // Cuando agregues videos reales, aquí puedes iniciar la reproducción
        });
    });

    // ==================== PARALLAX SUAVE PARA HERO ====================
    const heroElements = document.querySelectorAll('.projects-hero, .motion-hero');
    
    if (heroElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroElements.forEach(hero => {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled * 0.002);
            });
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== ACTIVE NAVIGATION ====================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Agregar sombra al hacer scroll
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==================== PAGE LOAD ANIMATION ====================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ==================== FORM HANDLING ====================
    const contactFormMain = document.querySelector('.contact-form-main');
    if (contactFormMain) {
        contactFormMain.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                newsletter: document.getElementById('newsletter').checked,
                message: document.getElementById('message').value,
                phone: document.getElementById('phone').value
            };
            
            console.log('Formulario enviado:', formData);
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            contactFormMain.reset();
        });
    }

    // ==================== UTILIDADES ====================
    function isMobile() {
        return window.innerWidth <= 768;
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            console.log('Ventana redimensionada');
            // Aquí puedes agregar lógica adicional para manejar resize
        }, 250);
    });

    // ==================== LOG FINAL ====================
    console.log('✅ Reset Studio - Todas las animaciones configuradas');
    console.log(`📱 Dispositivo: ${isMobile() ? 'Móvil' : 'Desktop'}`);
});

// ==================== CREDENTIALS BUTTON ====================
const credentialsBtn = document.querySelector('.credentials-btn');
if (credentialsBtn) {
    credentialsBtn.addEventListener('click', function () {
        window.location.href = "nosotros.html";
    });
}


const serviceButtons = document.querySelectorAll('.service-btn-dropdown');

serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('expanded');
        const service = this.querySelector('span').textContent;
        console.log(`Service clicked: ${service}`);
    });
});