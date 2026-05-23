// Blog Page JavaScript - iFiCode Inclusive
// Interactive functionality for blog filtering, animations, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all blog functionality
    initBlogFiltering();
    initNewsletterForm();
    initLoadMoreFunctionality();
    initScrollAnimations();
    initReadMoreButtons();
    initSearchFunctionality();
});

// Global state for blog grid
const blogState = {
    allPosts: [],
    currentCategory: 'all',
    initialCount: 9,
    step: 6,
    visibleCount: 9,
    loadMoreBtn: null
};

// Blog Post Filtering Functionality
function initBlogFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    blogState.allPosts = Array.from(document.querySelectorAll('.blog-post'));
    blogState.loadMoreBtn = document.querySelector('.load-more-btn');
    blogState.visibleCount = blogState.initialCount;
    renderPosts();

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update state and render
            blogState.currentCategory = category;
            blogState.visibleCount = blogState.initialCount;
            renderPosts();
        });
    });
}

function getFilteredPosts() {
    return blogState.allPosts.filter(post => {
        const postCategory = post.getAttribute('data-category');
        return blogState.currentCategory === 'all' || postCategory === blogState.currentCategory;
    });
}

function renderPosts() {
    const filtered = getFilteredPosts();
    // Hide all first
    blogState.allPosts.forEach(post => {
        post.style.display = 'none';
        post.classList.add('hidden');
        post.classList.remove('show');
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
    });

    // Show up to visibleCount
    filtered.slice(0, blogState.visibleCount).forEach((post, index) => {
        post.style.display = 'block';
        post.classList.remove('hidden');
        post.classList.add('show');
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 80);
    });

    // Toggle Load More visibility
    if (blogState.loadMoreBtn) {
        blogState.loadMoreBtn.style.display = filtered.length > blogState.visibleCount ? 'inline-block' : 'none';
    }
}

// Newsletter Form Functionality
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-submit, .newsletter-btn');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription process
                handleNewsletterSubscription(emailInput, submitButton, email);
            } else {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
            }
        });
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleNewsletterSubscription(emailInput, submitButton, email) {
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success state
        submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        submitButton.style.background = '#10b981';
        emailInput.value = '';
        
        showNotification('Successfully subscribed to our newsletter!', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    }, 2000);
}

// Load More Functionality
function initLoadMoreFunctionality() {
    blogState.loadMoreBtn = document.querySelector('.load-more-btn');
    blogState.allPosts = Array.from(document.querySelectorAll('.blog-post'));
    if (!blogState.loadMoreBtn) return;

    // Initial render (enforce 9-post cap on first load)
    blogState.visibleCount = blogState.initialCount;
    renderPosts();

    blogState.loadMoreBtn.addEventListener('click', function() {
        blogState.visibleCount += blogState.step;
        renderPosts();
        showNotification('More articles loaded!', 'success');
    });
}

// Deprecated generators removed; load-more now reveals existing posts based on filters

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.blog-post, .featured-content, .newsletter-content');
    animateElements.forEach(el => observer.observe(el));
}

// Read More Button Functionality
function initReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more, .read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            if (!href || href === '#') {
                e.preventDefault();
                showNotification('Article coming soon.', 'info');
            }
        });
    });
}

// Search Functionality (if search is added later)
function initSearchFunctionality() {
    const searchInput = document.querySelector('.blog-search-input');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            searchTimeout = setTimeout(() => {
                searchPosts(query);
            }, 300);
        });
    }
}

function searchPosts(query) {
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const category = post.querySelector('.post-category').textContent.toLowerCase();
        
        if (query === '' || title.includes(query) || excerpt.includes(query) || category.includes(query)) {
            post.style.display = 'block';
            post.classList.remove('hidden');
        } else {
            post.style.display = 'none';
            post.classList.add('hidden');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.blog-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `blog-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors.info;
}

// Enhanced Blog Post Interactions
function initBlogPostInteractions() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        // Add hover sound effect (optional)
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click tracking
        post.addEventListener('click', function(e) {
            if (!e.target.closest('.read-more')) {
                const title = this.querySelector('.post-title').textContent;
                console.log(`Blog post clicked: ${title}`);
                
                // Add ripple effect
                createRippleEffect(e, this);
            }
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .blog-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Initialize additional interactions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initBlogPostInteractions();
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Back to top functionality (if button exists)
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
