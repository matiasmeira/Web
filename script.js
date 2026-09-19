document.addEventListener('DOMContentLoaded', () => {
    // 1. Animaciones al hacer scroll: cada sección aparece una sola vez y se deja de observar
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            el.style.transitionDelay = `${index % 5 * 100}ms`;
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('appear'));
    }

    // 2. Borde en el navbar al scrollear (altura fija, no afecta scroll-padding-top)
    const scrollContainer = document.querySelector('.scroll-container');
    const navbar = document.getElementById('navbar');

    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Formulario de contacto (Formspree), feedback accesible vía aria-live
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const setFormStatus = (message, variant) => {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.classList.remove('form-status--success', 'form-status--error');
        if (variant) formStatus.classList.add(`form-status--${variant}`);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            const originalText = button.innerText;
            button.innerText = 'Enviando...';
            button.disabled = true;
            setFormStatus('', null);

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    setFormStatus('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
                    contactForm.reset();
                } else {
                    setFormStatus('Hubo un problema al enviar el mensaje. Intenta de nuevo.', 'error');
                }
            } catch (error) {
                setFormStatus('Error de conexión. Revisá tu internet.', 'error');
            } finally {
                button.innerText = originalText;
                button.disabled = false;
            }
        });
    }
});
