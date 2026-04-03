document.addEventListener('DOMContentLoaded', () => {
    // 1. Animaciones al hacer Scroll (Mejorado)
    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Opcional: Descomentar la siguiente línea si quieres que la animación ocurra solo 1 vez
                // observer.unobserve(entry.target); 
            } else {
                // Removemos la clase para que el efecto se repita al volver a scrollear
                entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        // Escalonar animaciones si hay múltiples elementos en bloque
        el.style.transitionDelay = `${index % 5 * 100}ms`;
        observer.observe(el);
    });

    // 2. Efecto Glassmorphism / Sombra en el Navbar al scrollear
    const scrollContainer = document.querySelector('.scroll-container');
    const navbar = document.getElementById('navbar');

    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Manejo del Formulario de Contacto (Formspree)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            const originalText = button.innerText;
            button.innerText = 'Enviando...';
            button.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
                    contactForm.reset();
                } else {
                    alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión. Revisa tu internet.');
            } finally {
                button.innerText = originalText;
                button.disabled = false;
            }
        });
    }
});