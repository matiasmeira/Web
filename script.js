document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.4 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.fade-in, .project-card-detailed, .skill-item-clean, .education-card-large');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }, index * 80);
                });
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.snap-section');
    sections.forEach(section => {
        const elements = section.querySelectorAll('.fade-in, .project-card-detailed, .skill-item-clean, .education-card-large');
        elements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 0.6s ease-out";
        });
        observer.observe(section);
    });
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button');
    button.innerText = 'Enviando...';

    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
            contactForm.reset();
        } else {
            alert('Hubo un problema al enviar el mensaje.');
        }
    } catch (error) {
        alert('Error de conexión.');
    } finally {
        button.innerText = 'Enviar Mensaje';
    }
});