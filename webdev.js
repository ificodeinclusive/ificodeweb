// Web Development Page JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Package comparison modal
    const comparisonModal = document.getElementById('packageComparisonModal');
    const comparisonOpeners = document.querySelectorAll('[data-comparison-open]');
    const comparisonClosers = document.querySelectorAll('[data-comparison-close]');

    function openComparisonModal() {
        if (!comparisonModal) return;
        comparisonModal.classList.add('is-open');
        comparisonModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeComparisonModal() {
        if (!comparisonModal) return;
        comparisonModal.classList.remove('is-open');
        comparisonModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    comparisonOpeners.forEach(button => {
        button.addEventListener('click', openComparisonModal);
    });

    comparisonClosers.forEach(button => {
        button.addEventListener('click', closeComparisonModal);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeComparisonModal();
        }
    });

    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('.intro-section, .why-matters-section, .expertise-section, .technology-section, .process-section, .portfolio-showcase-section, .pricing-section, .benefits-section, .ready-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Tech stack hover effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio showcase hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-showcase-item');
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        
        item.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            this.style.transform = 'translateY(0)';
        });
    });

    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
    });

    // Benefits cards staggered animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Expertise cards staggered animation
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Matter cards staggered animation
    const matterCards = document.querySelectorAll('.matter-card');
    matterCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');

    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = '#28a745';
                newsletterInput.value = '';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    this.style.background = '';
                }, 2000);
            } else {
                // Show error state
                newsletterInput.style.borderColor = '#dc3545';
                setTimeout(() => {
                    newsletterInput.style.borderColor = '';
                }, 2000);
            }
        });

        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation to buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default for actual links
            if (this.tagName === 'A' && this.getAttribute('href') !== '#') {
                return;
            }
            
            // Add loading state for form buttons or hash links
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    });

    // Add ripple effect to cards
    const cards = document.querySelectorAll('.matter-card, .expertise-card, .benefit-card, .process-step, .tech-category, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize animations
    function initAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(138, 43, 226, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all animations
    initAnimations();

    // Console log for debugging
    console.log('Web Development page JavaScript loaded successfully');
});
