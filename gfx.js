// Graphic Design Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple email validation
            if (validateEmail(email)) {
                // Simulate form submission
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.philosophy-card, .service-card, .process-item, .portfolio-item, .pricing-card, .benefit-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Process hexagon animation
    const processHexagons = document.querySelectorAll('.process-hexagon');
    processHexagons.forEach((hexagon, index) => {
        hexagon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(45deg) scale(1.1)';
        });
        
        hexagon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(45deg) scale(1)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            // Skip extra scaling when using Deliverables-style icons
            if (icon && !icon.classList.contains('benefit-icon')) {
                icon.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon && !icon.classList.contains('benefit-icon')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Philosophy card interactions
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const iconWrapper = this.querySelector('.philosophy-icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const iconWrapper = this.querySelector('.philosophy-icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Benefit card interactions
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary, .pricing-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('primary') || this.classList.contains('btn-primary') || this.classList.contains('pricing-btn')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Country selector interactions (parity with WebDev)
    const flagButtons = document.querySelectorAll('.flag-btn');
    const currencyEls = [
        document.getElementById('currency-1'),
        document.getElementById('currency-2'),
        document.getElementById('currency-3')
    ];

    const amountEls = [
        document.getElementById('amount-1'),
        document.getElementById('amount-2'),
        document.getElementById('amount-3')
    ];

    // Mirror WebDev pricing behavior: currency + amounts per country
    const pricingData = {
        nepal: { currency: 'NPR', prices: ['14,999', '19,999', '29,999'] },
        usa: { currency: '$', prices: ['299', '599', '999'] },
        australia: { currency: 'AUD', prices: ['449', '749', '1,199'] },
        india: { currency: '₹', prices: ['9,999', '14,999', '24,999'] },
        newzealand: { currency: 'NZD', prices: ['499', '799', '1,299'] },
        canada: { currency: 'CAD', prices: ['399', '699', '1,099'] },
        england: { currency: '£', prices: ['249', '499', '899'] },
        croatia: { currency: '€', prices: ['279', '529', '949'] }
    };

    function updatePricing(countryKey) {
        const data = pricingData[countryKey];
        if (!data) return;
        // currency
        currencyEls.forEach(el => { if (el) el.textContent = data.currency; });
        // amounts
        for (let i = 0; i < amountEls.length; i++) {
            const el = amountEls[i];
            if (el) el.textContent = data.prices[i];
        }
    }

    flagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            flagButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update pricing across cards
            const country = this.getAttribute('data-country');
            updatePricing(country);
        });
    });

    // Initialize currency symbol from active flag on load
    const activeFlag = document.querySelector('.flag-btn.active');
    if (activeFlag) {
        updatePricing(activeFlag.getAttribute('data-country'));
    }
});

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-banner');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.banner-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});