// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Initialize with 'All' filter active
    document.querySelector('.filter-btn[data-filter="all"]').click();
    
    // Add animation to portfolio items on scroll
    const animateOnScroll = function() {
        const items = document.querySelectorAll('.portfolio-item, .showcase-image, .showcase-stats, .showcase-text, .testimonial-card');
        
        items.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.classList.add('animate');
            }
        });
    };
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-item, .showcase-image, .showcase-stats, .showcase-text, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .portfolio-item.animate, .showcase-image.animate, .showcase-stats.animate, .showcase-text.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .showcase-stats.animate .stat-item:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .showcase-stats.animate .stat-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .showcase-stats.animate .stat-item:nth-child(3) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    setTimeout(animateOnScroll, 300);
    
    // Popup Ad functionality (reusing from main.js)
    const popupAd = document.getElementById('popupAd');
    const closePopup = document.getElementById('closePopup');
    
    // Show popup after 5 seconds
    setTimeout(() => {
        if (popupAd) {
            popupAd.classList.add('show');
        }
    }, 5000);
    
    // Close popup when close button is clicked
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            popupAd.classList.remove('show');
            
            // Set cookie to remember that user closed the popup
            document.cookie = "popupClosed=true; max-age=86400; path=/";
        });
    }
    
    // Check if popup was previously closed
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Don't show popup if it was closed in the last 24 hours
    if (getCookie('popupClosed')) {
        if (popupAd) {
            popupAd.style.display = 'none';
        }
    }
    
    // Mobile menu functionality (reusing from main.js)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});