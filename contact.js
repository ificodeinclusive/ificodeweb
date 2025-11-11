// Contact Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initContactForm();
    initSmoothScrolling();
    initAnimations();
});

// Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) return;
    
    // Form validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

// Validate individual form field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    switch(field.type) {
        case 'text':
            if (field.name === 'name' && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters long');
                return false;
            }
            if (field.name === 'subject' && value.length < 3) {
                showFieldError(field, 'Subject must be at least 3 characters long');
                return false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        default:
            if (field.tagName === 'TEXTAREA' && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long');
                return false;
            }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 5px;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
    
    // Animate error message
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-5px)';
        setTimeout(() => errorDiv.remove(), 300);
    }
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const formData = new FormData(form);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormMessage('Please correct the errors above', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
        Sending...
        <i class="fas fa-spinner"></i>
    `;
    
    try {
        // Submit form to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Track form submission (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: 'Contact Form'
                });
            }
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = `
            Send Message
            <i class="fas fa-arrow-right"></i>
        `;
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Show message with animation
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.modern-contact-detail, .modern-contact-social-link');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Social link tracking
document.addEventListener('click', function(e) {
    const socialLink = e.target.closest('.modern-contact-social-link, .social-link');
    
    if (socialLink) {
        const platform = getSocialPlatform(socialLink.href);
        
        // Track social link clicks (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Social',
                event_label: platform,
                transport_type: 'beacon'
            });
        }
        
        // Add click animation
        socialLink.style.transform = 'scale(0.95)';
        setTimeout(() => {
            socialLink.style.transform = '';
        }, 150);
    }
});

// Get social platform name from URL
function getSocialPlatform(url) {
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('twitter.com')) return 'Twitter';
    return 'Unknown';
}

// Email and phone click tracking
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
    
    if (link) {
        const type = link.href.startsWith('mailto:') ? 'Email' : 'Phone';
        
        // Track contact method clicks (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Contact',
                event_label: type,
                transport_type: 'beacon'
            });
        }
    }
});

// Map interaction tracking
document.addEventListener('click', function(e) {
    const mapContainer = e.target.closest('.modern-contact-map');
    
    if (mapContainer) {
        // Track map interactions (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Contact',
                event_label: 'Map Interaction',
                transport_type: 'beacon'
            });
        }
    }
});

// Form field focus tracking for UX insights
document.addEventListener('focus', function(e) {
    const formField = e.target.closest('#contactForm input, #contactForm textarea');
    
    if (formField) {
        // Track form field engagement (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_start', {
                event_category: 'Contact',
                event_label: formField.name || formField.id
            });
        }
    }
}, true);

// Page visibility change handling
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Re-focus on form if user returns to page
        const activeElement = document.activeElement;
        if (activeElement && activeElement.closest('#contactForm')) {
            activeElement.focus();
        }
    }
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Enter key on social links
    if (e.key === 'Enter' && e.target.classList.contains('modern-contact-social-link')) {
        e.target.click();
    }
    
    // Escape key to close any error messages
    if (e.key === 'Escape') {
        const errorMessages = document.querySelectorAll('.form-message.error');
        errorMessages.forEach(msg => {
            msg.classList.remove('show');
            setTimeout(() => msg.remove(), 300);
        });
    }
});

// Add CSS for error styling and animations
const style = document.createElement('style');
style.textContent = `
    .modern-form-group input.error,
    .modern-form-group textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .modern-contact-detail,
    .modern-contact-social-link {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .modern-contact-detail.animate-in,
    .modern-contact-social-link.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modern-contact-social-link:focus {
        outline: 2px solid var(--accent-color-1);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);