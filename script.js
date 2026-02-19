/* ===========================
   Script.js - Interactive Features
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to buttons
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add active state to nav links
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // Highlight nav links on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add animation to stats on scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards and mission items
    document.querySelectorAll('.feature-card, .mission-item, .donation-card').forEach(element => {
        observer.observe(element);
    });

    // Donate button click handlers
    const donateButtons = document.querySelectorAll('.donation-card .btn');
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in supporting our mission! Redirecting to donation page...');
            // In a real app, this would redirect to payment processor
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}! Check your inbox for updates.`);
                this.reset();
            }
        });
    }

    // Add page load animation
    document.body.style.animation = 'fadeIn 0.6s ease-out';
});

/* Utility function to throttle scroll events */
function throttle(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
    };
}

/* Parallax effect on hero section */
window.addEventListener('scroll', throttle(function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
}, 10));
