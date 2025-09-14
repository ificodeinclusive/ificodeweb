// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    // Dynamically add AOS attributes to elements
    const addAOSAttributes = () => {
        // Add to sections
        document.querySelectorAll('section').forEach((section, index) => {
            section.setAttribute('data-aos', 'fade-up');
            section.setAttribute('data-aos-delay', (index * 100).toString());
        });
     
    // Add floating animation to background elements
    const addFloatingAnimation = () => {
        const floatingElements = document.querySelectorAll('.floating-shape, .section-bg-shape');
        
        floatingElements.forEach((element, index) => {
            // Set random animation duration between 15-25s
            const duration = 15 + Math.random() * 10;
            // Set random delay between 0-5s
            const delay = Math.random() * 5;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    };
    
    addFloatingAnimation();
        
        // Value cards
        document.querySelectorAll('.value-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'zoom-in-up');
            card.setAttribute('data-aos-delay', (index * 100 + 100).toString());
        });
        
        // Timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
            item.setAttribute('data-aos-delay', (index * 150).toString());
        });
        
        // USP items
        document.querySelectorAll('.usp-item').forEach((item, index) => {
            item.setAttribute('data-aos', 'fade-right');
            item.setAttribute('data-aos-delay', (index * 100).toString());
        });
        
        // Team members
        document.querySelectorAll('.team-member').forEach((member, index) => {
            member.setAttribute('data-aos', 'flip-up');
            member.setAttribute('data-aos-delay', (index * 100).toString());
        });
        
        // Service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
        });
        
        // Stat cards
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'zoom-in');
            card.setAttribute('data-aos-delay', (index * 100).toString());
        });
        
        // Testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
        });
        // CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.setAttribute('data-aos', 'fade-up');
            ctaSection.setAttribute('data-aos-delay', '100');
        }
    // Call the function to add AOS attributes
    addAOSAttributes();
    
    // Main navigation functionality for desktop
    const mainNav = document.querySelector('.main-nav');
    
    // Enhanced Header Scroll Effect with smooth transitions
     const header = document.querySelector('.header');
     let lastScrollTop = 0;
     let scrollTimer;
     
     window.addEventListener('scroll', function() {
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         
         // Clear the previous timer
         clearTimeout(scrollTimer);
         
         // Set a new timer
         scrollTimer = setTimeout(() => {
             if (scrollTop > lastScrollTop && scrollTop > 100) {
                 // Scrolling down - hide header
                 header.style.transform = 'translateY(-100%)';
                 header.style.opacity = '0';
             } else {
                 // Scrolling up - show header
                 header.style.transform = 'translateY(0)';
                 header.style.opacity = '1';
                 
                 // Add shadow when scrolled
                 if (scrollTop > 50) {
                     header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                     header.style.backdropFilter = 'blur(10px)';
                     header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                 } else {
                     header.style.boxShadow = 'none';
                     header.style.backdropFilter = 'none';
                     header.style.backgroundColor = '';
                 }
             }
             
             lastScrollTop = scrollTop;
         }, 50); // Small delay for smoother effect
         
         // Back to top button
         const backToTopBtn = document.querySelector('.back-to-top');
         if (backToTopBtn) {
             if (scrollTop > 300) {
                 backToTopBtn.classList.add('show');
             } else {
                 backToTopBtn.classList.remove('show');
             }
         }
     });
     
     // Back to top button click event
     const backToTopBtn = document.querySelector('.back-to-top');
     if (backToTopBtn) {
         backToTopBtn.addEventListener('click', function(e) {
             e.preventDefault();
             window.scrollTo({
                 top: 0,
                 behavior: 'smooth'
             });
         });
     }
     
     // Add parallax effect to sections
     const addParallaxEffect = () => {
         window.addEventListener('mousemove', (e) => {
             const mouseX = e.clientX / window.innerWidth;
             const mouseY = e.clientY / window.innerHeight;
             
             document.querySelectorAll('.parallax-bg').forEach(element => {
                 const speed = element.getAttribute('data-speed') || 0.05;
                 const x = (mouseX - 0.5) * speed * 100;
                 const y = (mouseY - 0.5) * speed * 100;
                 
                 element.style.transform = `translate(${x}px, ${y}px)`;
             });
         });
     };
     
     addParallaxEffect();
     
     // Add smooth scroll for anchor links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
             const targetId = this.getAttribute('href');
             if (targetId !== '#') {
                 e.preventDefault();
                 
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                     window.scrollTo({
                         top: targetElement.offsetTop - 100, // Offset for header
                         behavior: 'smooth'
                     });
                 }
             }
         });
     });
     
     // Testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
        });
    };

    // Call the function to add AOS attributes
    addAOSAttributes();

    // Mobile Menu Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.createElement('div');
    overlay.classList.add('mobile-menu-overlay');
    document.body.appendChild(overlay);
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
            this.classList.toggle('active');
            
            // Animate the hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            if (mobileMenu) {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            document.body.classList.remove('menu-open');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    overlay.addEventListener('click', function() {
        document.body.classList.remove('menu-open');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect is already implemented above
    
    // 3D Tilt Effect for Cards
    const addTiltEffect = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const card = this;
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;
                const centerX = cardRect.left + cardWidth / 2;
                const centerY = cardRect.top + cardHeight / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                const rotateX = (mouseY / (cardHeight / 2)) * -5; // Max 5 degrees
                const rotateY = (mouseX / (cardWidth / 2)) * 5; // Max 5 degrees
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                
                // Add shine effect
                const shine = card.querySelector('.card-shine') || document.createElement('div');
                if (!card.querySelector('.card-shine')) {
                    shine.classList.add('card-shine');
                    card.appendChild(shine);
                    shine.style.position = 'absolute';
                    shine.style.top = '0';
                    shine.style.left = '0';
                    shine.style.right = '0';
                    shine.style.bottom = '0';
                    shine.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)';
                    shine.style.transform = 'translateZ(0)';
                    shine.style.pointerEvents = 'none';
                    shine.style.borderRadius = 'inherit';
                    shine.style.zIndex = '10';
                }
                
                // Calculate shine position
                const px = Math.abs(Math.floor((mouseX / cardWidth) * 100));
                const py = Math.abs(Math.floor((mouseY / cardHeight) * 100));
                shine.style.backgroundPosition = `${px}% ${py}%`;
            });
            
            element.addEventListener('mouseleave', function() {
                const card = this;
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'all 0.5s ease';
                
                // Remove shine effect
                const shine = card.querySelector('.card-shine');
                if (shine) {
                    shine.remove();
                }
            });
        });
    };
    
    // Apply tilt effect to various card elements
    addTiltEffect(document.querySelectorAll('.value-card, .team-member, .service-card, .stat-card, .testimonial-card'));
    
    // Enhanced Value Card Animation
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            const title = this.querySelector('h3');
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = 'white';
            }
            
            if (title) {
                title.style.transform = 'translateY(-5px)';
                title.style.background = 'var(--gradient-primary)';
                title.style.webkitBackgroundClip = 'text';
                title.style.backgroundClip = 'text';
                title.style.webkitTextFillColor = 'transparent';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            const title = this.querySelector('h3');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.color = '';
            }
            
            if (title) {
                title.style.transform = 'translateY(0)';
                title.style.background = '';
                title.style.webkitBackgroundClip = '';
                title.style.backgroundClip = '';
                title.style.webkitTextFillColor = '';
            }
        });
    });
    
    // Enhanced USP Item Animation
    const uspItems = document.querySelectorAll('.usp-item');
    
    uspItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.usp-icon');
            const content = this.querySelector('.usp-content');
            
            this.style.transform = 'translateX(10px)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.background = 'var(--gradient-primary)';
                icon.style.color = 'white';
            }
            
            if (content) {
                content.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.usp-icon');
            const content = this.querySelector('.usp-content');
            
            this.style.transform = 'translateX(0)';
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.background = '';
                icon.style.color = '';
            }
            
            if (content) {
                content.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Enhanced Stats Counter Animation with Odometer effect
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2500; // 2.5 seconds
            const frames = 60;
            const increment = target / (duration / (1000 / frames));
            
            // Add class for animation
            stat.classList.add('animate');
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(counter);
                    
                    // Add pulse effect after counting is done
                    stat.style.animation = 'pulse 1s ease-in-out';
                } else {
                    stat.textContent = Math.floor(count).toLocaleString();
                }
            }, 1000 / frames);
        });
        
        counted = true;
    }
    
    // Improved viewport detection with Intersection Observer
    const observeElements = (elements, callback) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the element is visible
        });
        
        elements.forEach(element => {
            if (element) observer.observe(element);
        });
    };
    
    // Observe stats section for counter animation
    const statsSection = document.getElementById('key-stats');
    if (statsSection) {
        observeElements([statsSection], () => {
            startCounting();
        });
    }
    
    // Back to top button functionality is already implemented above
});