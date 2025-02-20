// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('Burger clicked - menu toggled'); // Debug log
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const encodedSubject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            const mailtoUrl = `mailto:o.mugisha2@alustudent.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            window.location.href = mailtoUrl;
            
            showSuccessMessage();
            
            contactForm.reset();
        });
    }

    // Success message functionality
    function showSuccessMessage() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.style.display = 'flex';
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 3000);
        }
    }

    // Modal functionality
    function showModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // Skill bars animation
    function animateSkillBars() {
        document.querySelectorAll('.skill-card').forEach(card => {
            const progress = card.querySelector('.skill-progress');
            const percentage = card.getAttribute('data-skill');
            if (progress && percentage) {
                progress.style.transform = `scaleX(${percentage / 100})`;
            }
        });
    }

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                }
            });
        }, {
            threshold: 0.2
        });

        // Observe all sections
        document.querySelectorAll('section').forEach((section) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease-in-out';
            observer.observe(section);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('section').forEach((section) => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        animateSkillBars();
    }
})