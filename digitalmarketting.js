// Digital Marketing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Pricing functionality for Digital Marketing services
    const pricingData = {
        nepal: {
            currency: 'NPR',
            prices: ['19,999', '39,999', '79,999']
        },
        usa: {
            currency: '$',
            prices: ['159', '319', '639']
        },
        australia: {
            currency: 'AUD',
            prices: ['239', '479', '959']
        },
        india: {
            currency: '₹',
            prices: ['13,999', '27,999', '55,999']
        },
        newzealand: {
            currency: 'NZD',
            prices: ['249', '499', '999']
        },
        canada: {
            currency: 'CAD',
            prices: ['209', '419', '839']
        },
        england: {
            currency: '£',
            prices: ['125', '249', '499']
        },
        croatia: {
            currency: '€',
            prices: ['145', '289', '579']
        }
    };

    // Function to update pricing
    function updatePricing(country) {
        const data = pricingData[country];
        if (!data) return;

        // Update currency symbols
        const currencyElements = document.querySelectorAll('[id^="currency-"]');
        currencyElements.forEach(element => {
            element.textContent = data.currency;
        });

        // Update amounts
        const amountElements = document.querySelectorAll('[id^="amount-"]');
        amountElements.forEach((element, index) => {
            if (data.prices[index]) {
                element.textContent = data.prices[index];
            }
        });
    }

    // Country flag button functionality
    const flagButtons = document.querySelectorAll('.flag-btn');
    flagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            flagButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get country from data attribute
            const country = this.getAttribute('data-country');
            
            // Update pricing
            updatePricing(country);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

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

    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate service cards with stagger effect
                if (entry.target.classList.contains('services-section')) {
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Animate tool groups with stagger effect
                if (entry.target.classList.contains('tools-section')) {
                    const toolGroups = entry.target.querySelectorAll('.tool-group');
                    toolGroups.forEach((group, index) => {
                        setTimeout(() => {
                            group.style.opacity = '1';
                            group.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                
                // Animate success cards with stagger effect
                if (entry.target.classList.contains('success-stories-section')) {
                    const successCards = entry.target.querySelectorAll('.success-card');
                    successCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
                
                // Animate process steps with stagger effect
                if (entry.target.classList.contains('process-section')) {
                    const processSteps = entry.target.querySelectorAll('.process-step');
                    processSteps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize card animations (set initial state)
    const animatedCards = document.querySelectorAll('.service-card, .tool-group, .success-card, .process-step');
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Hero section typing effect for title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Stat counter animation with enhanced effects
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60; // Slower animation for better effect
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        // Add pulsing effect during animation
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Reset scale after animation
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
            }
            
            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // Observe stat numbers for counter animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    // Enhanced why-card hover effects
    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle rotation and glow effect
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.2)';
        });
    });

    // Stat card enhanced hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add bounce effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.1)';
        });
    });

    // Tool item hover effects
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service card hover effects with icon rotation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon i');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Success card pulse effect on hover
    const successCards = document.querySelectorAll('.success-card');
    successCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.success-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.success-icon');
            if (icon) {
                icon.style.animation = 'none';
            }
        });
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
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
    document.head.appendChild(rippleStyle);

    console.log('Digital Marketing page JavaScript loaded successfully!');
});