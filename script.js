document.addEventListener('DOMContentLoaded', () => {
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
