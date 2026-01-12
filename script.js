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