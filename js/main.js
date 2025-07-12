document.addEventListener('DOMContentLoaded', function() {
    // Popup Ad Functionality
    const popupAd = document.getElementById('popupAd');
    const popupClose = document.getElementById('popupClose');
    const popupButton = document.getElementById('popupButton');
    
    // Show popup after a short delay when page loads
    setTimeout(() => {
        popupAd.classList.add('active');
    }, 1500);
    
    // Close popup when close button is clicked
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popupAd.classList.remove('active');
        });
    }
    
    // Handle Get Now button click
    if (popupButton) {
        popupButton.addEventListener('click', () => {
            // You can redirect to a specific page or perform any action
            alert('Thank you for your interest! We will contact you shortly.');
            popupAd.classList.remove('active');
        });
    }
    
    // Close popup when clicking outside the popup container
    popupAd.addEventListener('click', (e) => {
        if (e.target === popupAd) {
            popupAd.classList.remove('active');
        }
    });

    // Add interactive effects to modern CTA buttons
    const modernCtaButtons = document.querySelectorAll('.modern-cta-btn');
    modernCtaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('.modern-cta-btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('.modern-cta-btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Modern CTA Card 3D Effect
    const ctaCard = document.querySelector('.modern-cta-card');
    
    if (ctaCard) {
        ctaCard.addEventListener('mousemove', function(e) {
            const rect = ctaCard.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            // The multiplier controls the intensity of the effect
            const multiplier = 20;
            const rotateY = ((x / rect.width) - 0.5) * multiplier;
            const rotateX = ((y / rect.height) - 0.5) * -multiplier; // Negative to make it tilt toward the mouse
            
            // Apply the transformation
            ctaCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        // Reset the card when mouse leaves
        ctaCard.addEventListener('mouseleave', function() {
            ctaCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            ctaCard.style.transition = 'transform 0.5s ease';
        });
        
        // Remove transition on mouse enter for smoother effect
        ctaCard.addEventListener('mouseenter', function() {
            ctaCard.style.transition = 'none';
        });
    }
    
    // Modern Contact Card 3D Effect
    const contactCard = document.querySelector('.modern-contact-card');
    
    if (contactCard) {
        contactCard.addEventListener('mousemove', function(e) {
            const rect = contactCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Softer effect for the contact card
            const multiplier = 10;
            const rotateY = ((x / rect.width) - 0.5) * multiplier;
            const rotateX = ((y / rect.height) - 0.5) * -multiplier;
            
            // Apply the transformation
            contactCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });
        
        // Reset the card when mouse leaves
        contactCard.addEventListener('mouseleave', function() {
            contactCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            contactCard.style.transition = 'transform 0.5s ease';
        });
        
        // Remove transition on mouse enter for smoother effect
        contactCard.addEventListener('mouseenter', function() {
            contactCard.style.transition = 'none';
        });
    }
    
    // Form input focus effects
    const formGroups = document.querySelectorAll('.modern-form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check initial state
            if (input.value) {
                label.classList.add('active');
            }
            
            // Focus events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });
    
    // Contact details hover effect
    const contactDetails = document.querySelectorAll('.modern-contact-detail');
    
    contactDetails.forEach(detail => {
        detail.addEventListener('mouseenter', () => {
            detail.style.transform = 'translateY(-5px)';
            detail.style.transition = 'transform 0.3s ease';
        });
        
        detail.addEventListener('mouseleave', () => {
            detail.style.transform = 'translateY(0)';
        });
    });
});

// Add interactive effects for the ultra CTA section
document.addEventListener('DOMContentLoaded', function() {

    // Get all buttons with class ultra-cta-btn
    const ultraCtaButtons = document.querySelectorAll('.ultra-cta-btn');
    
    // Add hover effects to buttons
    ultraCtaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // We'll let CSS handle the transform for smoother animation
            if (this.querySelector('.btn-icon')) {
                if (this.classList.contains('primary')) {
                    this.querySelector('.btn-icon').style.transform = 'translateX(5px)';
                }
            }
        });
        
        button.addEventListener('mouseleave', function() {
            // Reset the transform
            if (this.querySelector('.btn-icon')) {
                this.querySelector('.btn-icon').style.transform = 'translateX(0)';
            }
        });
    });
    
    // Add parallax effect to the background elements
    const ultraCtaSection = document.querySelector('.ultra-cta-section');
    if (ultraCtaSection) {
        ultraCtaSection.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const glowTop = this.querySelector('.ultra-cta-glow-top');
            const glowBottom = this.querySelector('.ultra-cta-glow-bottom');
            const sphere = this.querySelector('.ultra-cta-sphere');
            
            if (glowTop) {
                glowTop.style.transform = `translate(${moveX * -2}px, ${moveY * -2}px)`;
            }
            
            if (glowBottom) {
                glowBottom.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
            }
            
            if (sphere) {
                sphere.style.transform = `translate(calc(-50% + ${moveX * 3}px), calc(-50% + ${moveY * 3}px))`;
            }
        });
    }
    
    // Add animation to feature cards on scroll
    const ultraFeatures = document.querySelectorAll('.ultra-feature');
    
    if (ultraFeatures.length > 0) {
        // Simple function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Add animation class when scrolled into view
        function animateOnScroll() {
            ultraFeatures.forEach((feature, index) => {
                if (isInViewport(feature)) {
                    // Add a slight delay for each feature
                    setTimeout(() => {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }
        
        // Set initial state
        ultraFeatures.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
        // Run once on load
        animateOnScroll();
    }
    
    // Back to Top Button
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
        
        // Enhanced Footer Interactions
        const footerLogo = document.querySelector('.footer-logo');
        const socialLinks = document.querySelectorAll('.social-link');
        const footerLinks = document.querySelectorAll('.footer-links a');
        const contactItems = document.querySelectorAll('.contact-item');
        const benefitItems = document.querySelectorAll('.benefit');
        const highlightText = document.querySelector('.highlight-text');
        
        // Add subtle pulse animation to the highlight text
        if (highlightText) {
            setInterval(() => {
                highlightText.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    highlightText.style.filter = 'brightness(1)';
                }, 500);
            }, 3000);
        }
        
        // Add staggered hover effect for social links
        if (socialLinks.length) {
            socialLinks.forEach((link, index) => {
                link.addEventListener('mouseover', () => {
                    // Create a ripple effect among neighboring social links
                    socialLinks.forEach((otherLink, otherIndex) => {
                        if (otherLink !== link) {
                            const distance = Math.abs(index - otherIndex);
                            const delay = distance * 50;
                            setTimeout(() => {
                                otherLink.style.transform = 'translateY(-2px)';
                                setTimeout(() => {
                                    otherLink.style.transform = '';
                                }, 300);
                            }, delay);
                        }
                    });
                });
            });
        }
        
        // Add subtle hover effect for footer links
        if (footerLinks.length) {
            footerLinks.forEach(link => {
                const originalText = link.textContent;
                link.addEventListener('mouseenter', () => {
                    link.style.transition = 'all 0.3s ease';
                });
            });
        }
    }
});