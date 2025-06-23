// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#00C9FF", "#9A29FF"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.3
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Counter animation elements
    const counters = document.querySelectorAll('.counter');
    const counterSection = document.querySelector('.impact');
    let counterAnimationTriggered = false;

    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Trigger counter animation when impact section is in view
        if (!counterAnimationTriggered && isElementInViewport(counterSection)) {
            animateCounters();
            counterAnimationTriggered = true;
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter animation function
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = Math.ceil(target / (duration / 30)); // Update every 30ms
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = count;
                }
            }, 30);
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Testimonials slider drag functionality
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsSlider.classList.add('active');
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });

        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });

        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        testimonialsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            testimonialsSlider.classList.add('active');
            startX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('touchend', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });

        testimonialsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize - check if any section is in view on page load
    if (!counterAnimationTriggered && isElementInViewport(counterSection)) {
        animateCounters();
        counterAnimationTriggered = true;
    }

    // Back to Top Button Functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
                newsletterBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                newsletterInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    newsletterBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    newsletterBtn.style.background = 'linear-gradient(135deg, #2ecbff, #b267ff)';
                }, 3000);
            } else {
                // Show error state
                newsletterInput.style.borderColor = '#ff6b6b';
                newsletterInput.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
                
                setTimeout(() => {
                    newsletterInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    newsletterInput.style.boxShadow = 'none';
                }, 3000);
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
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
});