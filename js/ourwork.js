// Our Work Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Project modal elements
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    // Filter Projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                    card.style.display = 'block';
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                    setTimeout(() => {
                        if (card.classList.contains('hide')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
    
    // Project Modal Functionality
    const projectData = {
        explorifi: {
            title: 'Explorifi - Travel & Exploration Platform',
            category: 'Web Development',
            description: 'A comprehensive travel and exploration platform designed to help users discover new destinations, plan trips, and share experiences. The platform features an intuitive booking system, user-generated reviews, interactive maps, and personalized recommendations.',
            features: [
                'Interactive destination maps with real-time data',
                'Comprehensive booking system for hotels and activities',
                'User review and rating system',
                'Personalized travel recommendations',
                'Social sharing and community features',
                'Mobile-responsive design',
                'Multi-language support'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Google Maps API', 'Stripe Payment'],
            image: 'images/Explorifi.png',
            challenges: 'Integrating multiple APIs for real-time data, optimizing performance for large datasets, and creating an intuitive user experience for complex travel planning.',
            results: 'Increased user engagement by 150%, reduced booking time by 40%, and achieved 95% user satisfaction rating.'
        },
        consultifi: {
            title: 'Consultifi - Business Consultancy Platform',
            category: 'Business Solutions',
            description: 'A professional consultancy platform that streamlines business operations with advanced client management, project tracking, and comprehensive business analytics. Built for modern consulting firms.',
            features: [
                'Advanced client relationship management',
                'Project timeline and milestone tracking',
                'Business analytics and reporting dashboard',
                'Document management system',
                'Team collaboration tools',
                'Automated invoicing and billing',
                'Custom branding options'
            ],
            technologies: ['Vue.js', 'PHP', 'MySQL', 'Laravel', 'Chart.js', 'PDF Generation'],
            image: 'images/Consultifi.png',
            challenges: 'Creating a scalable architecture for multiple client data, implementing complex reporting features, and ensuring data security compliance.',
            results: 'Improved client management efficiency by 60%, reduced project delivery time by 30%, and increased revenue tracking accuracy by 95%.'
        },
        tradifi: {
            title: 'Tradifi - Advanced Trading Platform',
            category: 'Trading Platform',
            description: 'A sophisticated trading company platform featuring real-time market data, advanced portfolio management, secure transaction processing, and comprehensive analytics for professional traders.',
            features: [
                'Real-time market data and charts',
                'Advanced portfolio management tools',
                'Secure transaction processing',
                'Risk assessment and management',
                'Automated trading algorithms',
                'Multi-currency support',
                'Advanced security protocols'
            ],
            technologies: ['Angular', 'Express.js', 'PostgreSQL', 'WebSocket', 'D3.js', 'JWT Authentication'],
            image: 'images/tradifi.png',
            challenges: 'Handling real-time data streams, implementing complex trading algorithms, and ensuring maximum security for financial transactions.',
            results: 'Processed over $10M in transactions, achieved 99.9% uptime, and reduced trade execution time by 50%.'
        },
        pizifi: {
            title: 'Pizifi - Modern Restaurant Website',
            category: 'Restaurant Website',
            description: 'A modern, responsive restaurant website featuring online ordering capabilities, dynamic menu management, customer review system, and integrated payment processing.',
            features: [
                'Online ordering and delivery system',
                'Dynamic menu management',
                'Customer review and rating system',
                'Table reservation system',
                'Loyalty program integration',
                'Social media integration',
                'Mobile-optimized design'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'PayPal API'],
            image: 'images/pizifi.png',
            challenges: 'Creating an intuitive ordering flow, integrating multiple payment gateways, and optimizing for mobile users.',
            results: 'Increased online orders by 200%, improved customer satisfaction by 45%, and reduced order processing time by 35%.'
        },
        ifigym: {
            title: 'iFi Gym - Fitness Management System',
            category: 'Fitness Management',
            description: 'A comprehensive gym management system with member tracking, personalized workout plans, progress monitoring, and social features to enhance the fitness experience.',
            features: [
                'Member registration and management',
                'Personalized workout plan creation',
                'Progress tracking and analytics',
                'Class scheduling and booking',
                'Trainer assignment and communication',
                'Nutrition tracking integration',
                'Social challenges and leaderboards'
            ],
            technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Push Notifications'],
            image: 'images/ifigym.png',
            challenges: 'Creating cross-platform mobile compatibility, implementing real-time sync across devices, and designing engaging user experience.',
            results: 'Increased member retention by 40%, improved workout completion rates by 65%, and enhanced member engagement by 80%.'
        },
        ificodefood: {
            title: 'iFiCode Food - Food Delivery Platform',
            category: 'Food Delivery',
            description: 'A modern food delivery platform with real-time order tracking, integrated payment systems, restaurant management dashboard, and customer support features.',
            features: [
                'Real-time order tracking',
                'Multi-restaurant management',
                'Integrated payment processing',
                'Delivery route optimization',
                'Customer rating and feedback system',
                'Restaurant analytics dashboard',
                'Push notification system'
            ],
            technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'Google Maps API', 'Stripe'],
            image: 'images/iFiCodeFood.png',
            challenges: 'Implementing real-time tracking, optimizing delivery routes, and managing multiple restaurant integrations simultaneously.',
            results: 'Served 10,000+ orders, achieved 4.8/5 customer rating, and reduced average delivery time by 25%.'
        }
    };
    
    // View button click handlers
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });
    
    // Show project modal
    function showProjectModal(project) {
        const modalContent = `
            <div class="modal-project-header">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 30px;">
                <div class="modal-project-category" style="color: var(--primary-color); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">${project.category}</div>
                <h2 style="color: var(--text-color); font-size: 2rem; font-weight: 700; margin-bottom: 20px;">${project.title}</h2>
                <p style="color: var(--light-text); line-height: 1.6; margin-bottom: 30px; font-size: 1.1rem;">${project.description}</p>
            </div>
            
            <div class="modal-project-details">
                <div class="modal-section" style="margin-bottom: 30px;">
                    <h3 style="color: var(--text-color); font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid var(--primary-color); padding-bottom: 5px; display: inline-block;">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => `
                            <li style="color: var(--light-text); margin-bottom: 8px; padding-left: 20px; position: relative;">
                                <i class="fas fa-check" style="color: var(--primary-color); position: absolute; left: 0; top: 2px;"></i>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="modal-section" style="margin-bottom: 30px;">
                    <h3 style="color: var(--text-color); font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid var(--primary-color); padding-bottom: 5px; display: inline-block;">Technologies Used</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${project.technologies.map(tech => `
                            <span style="background: rgba(139, 92, 246, 0.2); color: var(--primary-color); padding: 6px 15px; border-radius: 20px; font-size: 14px; font-weight: 500; border: 1px solid rgba(139, 92, 246, 0.3);">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-section" style="margin-bottom: 30px;">
                    <h3 style="color: var(--text-color); font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid var(--primary-color); padding-bottom: 5px; display: inline-block;">Challenges & Solutions</h3>
                    <p style="color: var(--light-text); line-height: 1.6;">${project.challenges}</p>
                </div>
                
                <div class="modal-section">
                    <h3 style="color: var(--text-color); font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid var(--primary-color); padding-bottom: 5px; display: inline-block;">Results & Impact</h3>
                    <p style="color: var(--light-text); line-height: 1.6;">${project.results}</p>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal functionality
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // External link buttons
    const linkButtons = document.querySelectorAll('.link-btn');
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            // You can add actual project URLs here
            alert('Project link would open here. Contact us for live demo!');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }
    });
    
    // Back to top functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#contact') {
                e.preventDefault();
                // Redirect to index.html with contact section
                window.location.href = 'index.html#contact';
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards for animation
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Newsletter form functionality (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
                newsletterBtn.style.background = 'var(--gradient-primary)';
                newsletterInput.value = '';
                
                setTimeout(() => {
                    newsletterBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    newsletterBtn.style.background = '';
                }, 2000);
                
                alert('Thank you for subscribing to our newsletter!');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});