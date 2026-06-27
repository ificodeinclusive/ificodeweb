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
            liveUrl: 'https://ificode.online',
            challenges: 'Implementing real-time tracking, optimizing delivery routes, and managing multiple restaurant integrations simultaneously.',
            results: 'Served 10,000+ orders, achieved 4.8/5 customer rating, and reduced average delivery time by 25%.'
        },
        localify: {
            title: 'Localify - Mobile Platform for Explorers',
            category: 'Mobile Platform',
            description: 'Localify is a mobile platform made by explorers for explorers, helping people discover local places, routes, hidden spots, and nearby experiences through a clean mobile-first interface.',
            features: [
                'Explorer-focused mobile discovery experience',
                'Location-aware place and route browsing',
                'Saved places and personalized exploration lists',
                'Firebase-backed data and authentication',
                'Fast React Native mobile interface',
                'Designed for community-driven local discovery'
            ],
            technologies: ['React Native', 'Firebase', 'Mobile UX', 'Location Features'],
            image: 'images/projects/localify.webp',
            challenges: 'Designing a mobile experience that feels simple for casual users while still supporting useful discovery features for active explorers.',
            results: 'Created a clear mobile platform direction with a scalable Firebase foundation and a focused explorer-first user experience.'
        },
        legalheart: {
            title: 'Legal Heart - Law Firm Website',
            category: 'Law Firm Website',
            description: 'A professional website for a law firm, structured to present legal services clearly, build trust quickly, and guide visitors toward consultation enquiries.',
            features: [
                'Clear legal service presentation',
                'Trust-focused homepage structure',
                'Attorney and firm credibility sections',
                'Consultation-ready contact flow',
                'SEO-friendly service page direction',
                'Responsive design for mobile and desktop'
            ],
            technologies: ['Responsive Web Design', 'SEO Structure', 'Legal UX', 'Lead Forms'],
            image: 'images/lhwebsite.webp',
            challenges: 'Balancing professional legal credibility with an approachable experience that helps potential clients find the right service quickly.',
            results: 'Produced a polished law firm website direction focused on trust, clarity, and enquiry conversion.'
        },
        insuranceone: {
            title: 'Insurance Company Website Sample 1',
            category: 'Insurance Website',
            description: 'A sample insurance company website built around clear product discovery, quick quote prompts, and a trustworthy service presentation.',
            features: [
                'Insurance plan discovery sections',
                'Quote-focused call-to-action flow',
                'Trust and credibility areas',
                'Clean service hierarchy',
                'Responsive landing page structure',
                'Conversion-focused content layout'
            ],
            technologies: ['Web Design', 'Insurance UX', 'Quote Flow', 'Responsive Layout'],
            image: 'images/projects/insurancecompany1.webp',
            challenges: 'Making insurance information feel easy to scan without overwhelming users with too much policy detail at once.',
            results: 'Created a clean insurance website sample that supports plan browsing, trust-building, and lead generation.'
        },
        insurancethree: {
            title: 'Insurance Company Website Sample 3',
            category: 'Insurance Website',
            description: 'A second insurance website concept with stronger visual storytelling, simplified plan navigation, and customer-first page hierarchy.',
            features: [
                'Visual insurance landing page concept',
                'Service cards for policy categories',
                'Customer-first content hierarchy',
                'Lead generation CTA placement',
                'Trust-building visual sections',
                'Mobile-responsive structure'
            ],
            technologies: ['Website Concept', 'Service UX', 'Responsive Design', 'Lead Strategy'],
            image: 'images/projects/insurancecompany3.webp',
            challenges: 'Creating a distinct insurance website direction that looks modern while still feeling reliable and professional.',
            results: 'Delivered a polished sample direction for an insurance brand with improved visual appeal and service clarity.'
        },
        gymsample: {
            title: 'Gym Website Sample',
            category: 'Gym Website',
            description: 'A fitness website sample designed to promote memberships, classes, trainers, facilities, and gym enquiries through an energetic digital presence.',
            features: [
                'Membership-focused landing page flow',
                'Trainer and class showcase sections',
                'Facility and gym highlights',
                'Strong visual fitness presentation',
                'Contact and enquiry call-to-actions',
                'Responsive website experience'
            ],
            technologies: ['Fitness Website', 'Landing Page UX', 'Responsive Design', 'Conversion Strategy'],
            image: 'images/projects/gym1.webp',
            challenges: 'Creating a gym website that feels energetic and visually strong while still making memberships and enquiries easy to act on.',
            results: 'Built a clean fitness website sample that supports brand energy, service discovery, and membership conversion.'
        },
        wordpressecommerce: {
            title: 'WordPress Ecommerce Setup',
            category: 'Ecommerce Setup',
            description: 'A WordPress ecommerce setup built to help a business present products clearly, manage store content, and move customers through a simple online shopping flow.',
            features: [
                'WordPress store setup and structure',
                'Product presentation layout',
                'Cart and checkout-focused user flow',
                'Store management-ready page structure',
                'Responsive ecommerce browsing experience',
                'Conversion-focused product discovery'
            ],
            technologies: ['WordPress', 'Ecommerce', 'Store Setup', 'Responsive Web'],
            image: 'images/projects/wordpressecommerce.webp',
            challenges: 'Creating an ecommerce setup that looks professional while keeping product browsing, store management, and customer checkout easy to understand.',
            results: 'Built a clean WordPress ecommerce direction ready for product listings, sales flow, and business growth online.'
        },
        wireframe: {
            title: 'Wireframe Design',
            category: 'Wireframe Design',
            description: 'A wireframe design focused on early-stage planning, layout clarity, user flow, and content hierarchy before moving into polished visual UI.',
            features: [
                'Clear page structure planning',
                'User journey and flow mapping',
                'Content hierarchy definition',
                'Low-distraction layout exploration',
                'UX decision-making before final design',
                'Foundation for faster UI development'
            ],
            technologies: ['Wireframing', 'UX Planning', 'Layout Design', 'Product Strategy'],
            image: 'images/projects/wireframe1.webp',
            challenges: 'Translating broad product ideas into a simple structural plan that makes navigation, content, and user actions easy to evaluate.',
            results: 'Created a practical wireframe foundation that supports faster design decisions and cleaner final interface development.'
        },
        schoolwebsite: {
            title: 'School Website',
            category: 'School Website',
            description: 'A school website concept designed to present admissions, academics, school updates, programs, and contact information through a clean education-focused layout.',
            features: [
                'Admissions-focused page structure',
                'Academic programs and school information sections',
                'News and updates-ready content flow',
                'Parent and student-friendly navigation',
                'Responsive layout for mobile access',
                'Trust-focused education website presentation'
            ],
            technologies: ['Education Website', 'Responsive Design', 'Admissions UX', 'Content Structure'],
            image: 'images/projects/school.webp',
            challenges: 'Organizing school information so parents, students, and visitors can quickly find admissions, programs, notices, and contact details.',
            results: 'Created a polished school website concept with clear navigation, education-focused presentation, and a practical structure for future content updates.'
        },
        'banquet-party-palace': {
            title: 'Banquet & Party Palace Website',
            category: 'Hospitality',
            description: 'Premium banquet and event venue website designed to showcase services, galleries, booking inquiries, and event packages.',
            features: ['Event package presentation', 'Gallery-focused visual sections', 'Booking inquiry flow', 'Service and venue highlights', 'Mobile-responsive browsing', 'Trust-focused hospitality layout'],
            technologies: ['Responsive Web Design', 'Booking UX', 'Gallery Layout', 'Hospitality Website'],
            image: 'images/projects/banquetsample.webp',
            challenges: 'Presenting a premium event venue experience while keeping booking enquiries and package discovery simple for visitors.',
            results: 'Created a polished hospitality website sample with strong visual hierarchy, clear venue storytelling, and conversion-ready enquiry paths.'
        },
        'luxury-cafe': {
            title: 'Luxury Caf\u00e9 Website',
            category: 'Caf\u00e9 & Restaurant',
            description: 'Elegant caf\u00e9 website focused on branding, menu presentation, reservations, and customer engagement.',
            features: ['Brand-forward homepage', 'Menu presentation sections', 'Reservation-ready CTA flow', 'Customer engagement areas', 'Mobile-friendly design', 'Social and location touchpoints'],
            technologies: ['Restaurant Website', 'Branding', 'Menu UX', 'Responsive Design'],
            image: 'images/projects/cafesample.webp',
            challenges: 'Balancing premium caf\u00e9 branding with practical menu discovery, reservation prompts, and local customer engagement.',
            results: 'Delivered an elegant caf\u00e9 website concept that supports brand recall, menu browsing, and customer conversion.'
        },
        'law-firm-sample': {
            title: 'Law Firm Website',
            category: 'Legal Services',
            description: 'Professional law firm website featuring legal services, attorney profiles, consultation booking, and trust-focused design.',
            features: ['Legal service presentation', 'Attorney profile sections', 'Consultation booking flow', 'Trust and credibility cues', 'SEO-friendly page structure', 'Responsive professional layout'],
            technologies: ['Legal UX', 'Consultation Flow', 'SEO Structure', 'Responsive Web'],
            image: 'images/projects/lawfirmsample.webp',
            challenges: 'Making legal services feel trustworthy, easy to understand, and simple to act on without overwhelming potential clients.',
            results: 'Built a professional legal website sample with clearer service pathways and consultation-focused user experience.'
        },
        'restaurant-sample': {
            title: 'Restaurant Website',
            category: 'Restaurant & Dining',
            description: 'Modern restaurant website with menu showcase, reservations, gallery, and customer-focused user experience.',
            features: ['Menu showcase', 'Reservation CTA flow', 'Gallery presentation', 'Location and contact sections', 'Mobile responsive interface', 'Dining-focused visual hierarchy'],
            technologies: ['Restaurant UX', 'Menu Layout', 'Reservation Flow', 'Responsive Design'],
            image: 'images/projects/restrosample.webp',
            challenges: 'Creating a restaurant page experience that feels appetizing while keeping menu access and reservation actions immediate.',
            results: 'Created a modern dining website sample that supports menu discovery, gallery browsing, and reservation conversion.'
        },
        'travel-agency-sample': {
            title: 'Travel Agency Website',
            category: 'Travel & Tourism',
            description: 'Conversion-focused travel website highlighting destinations, packages, inquiry forms, and booking workflows.',
            features: ['Destination highlights', 'Travel package sections', 'Inquiry form flow', 'Booking workflow direction', 'Visual itinerary storytelling', 'Responsive tourism layout'],
            technologies: ['Travel Website', 'Package UX', 'Inquiry Flow', 'Tourism Design'],
            image: 'images/projects/travelagencysample.webp',
            challenges: 'Showing enough destination and package detail while keeping travellers focused on enquiry and booking actions.',
            results: 'Designed a travel agency website sample that improves package clarity, destination appeal, and lead generation.'
        },
        'clinic-sample': {
            title: 'Healthcare & Clinic Website',
            category: 'Healthcare',
            description: 'Professional clinic website featuring appointment booking, doctor information, services, and patient-focused design.',
            features: ['Appointment booking CTA', 'Doctor information sections', 'Healthcare service pages', 'Patient-focused content flow', 'Trust and care cues', 'Responsive clinic layout'],
            technologies: ['Healthcare UX', 'Appointment Flow', 'Service Pages', 'Responsive Web'],
            image: 'images/projects/clinicsample.webp',
            challenges: 'Designing a clinic website that feels calm and credible while making appointments and service discovery easy.',
            results: 'Created a professional clinic website sample with clear patient pathways, service visibility, and appointment-focused conversion.'
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
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                <div class="modal-project-category">${project.category}</div>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
            </div>
            
            <div class="modal-project-details">
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `
                            <li>
                                <i class="fas fa-check"></i>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-tags">
                        ${project.technologies.map(tech => `
                            <span>${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Results & Impact</h3>
                    <p>${project.results}</p>
                </div>
                ${project.liveUrl ? `
                <div class="modal-section">
                    <a class="project-live-preview modal-live-preview" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        Visit ificode.online for live preview
                    </a>
                </div>
                ` : ''}
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal functionality
    function closeModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
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
                // Redirect to / with contact section
                window.location.href = '/contact';
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
