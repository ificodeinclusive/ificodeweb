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

// Blog Post Filtering Functionality
function initBlogFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts with animation
            filterPosts(blogPosts, category);
        });
    });
}

function filterPosts(posts, category) {
    posts.forEach((post, index) => {
        const postCategory = post.getAttribute('data-category');
        
        if (category === 'all' || postCategory === category) {
            // Show post with animation
            post.style.display = 'block';
            post.classList.remove('hidden');
            post.classList.add('show');
            
            // Stagger animation
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            // Hide post
            post.style.opacity = '0';
            post.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                post.style.display = 'none';
                post.classList.add('hidden');
                post.classList.remove('show');
            }, 300);
        }
    });
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
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const blogGrid = document.querySelector('.blog-posts-grid');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMorePosts(blogGrid, this);
        });
    }
}

function loadMorePosts(grid, button) {
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    // Simulate loading more posts
    setTimeout(() => {
        const newPosts = generateMorePosts();
        
        newPosts.forEach((postHTML, index) => {
            const postElement = document.createElement('article');
            postElement.innerHTML = postHTML;
            postElement.className = 'blog-post';
            postElement.style.opacity = '0';
            postElement.style.transform = 'translateY(30px)';
            
            grid.appendChild(postElement);
            
            // Animate in
            setTimeout(() => {
                postElement.style.opacity = '1';
                postElement.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        showNotification('More articles loaded!', 'success');
    }, 1500);
}

function generateMorePosts() {
    // Sample additional posts
    return [
        `<div class="post-image">
            <img src="images/web-development.svg" alt="Advanced JavaScript">
            <div class="post-category">Web Development</div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-date">November 28, 2024</span>
                <span class="post-read-time">6 min read</span>
            </div>
            <h3 class="post-title">Advanced JavaScript Patterns for Modern Web Apps</h3>
            <p class="post-excerpt">
                Explore advanced JavaScript patterns and techniques that will elevate your web development skills.
            </p>
            <div class="post-footer">
                <div class="post-author">
                    <img src="images/ificodesbrandicon.png" alt="Author">
                    <span>JavaScript Team</span>
                </div>
                <a href="#" class="read-more">Read More</a>
            </div>
        </div>`,
        
        `<div class="post-image">
            <img src="images/ui-ux-design.svg" alt="Design Systems">
            <div class="post-category">UI/UX Design</div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-date">November 25, 2024</span>
                <span class="post-read-time">7 min read</span>
            </div>
            <h3 class="post-title">Building Scalable Design Systems</h3>
            <p class="post-excerpt">
                Learn how to create and maintain design systems that scale with your growing product needs.
            </p>
            <div class="post-footer">
                <div class="post-author">
                    <img src="images/ificodesbrandicon.png" alt="Author">
                    <span>Design Team</span>
                </div>
                <a href="#" class="read-more">Read More</a>
            </div>
        </div>`
    ];
}

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
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate navigation to full article
            showNotification('Article loading...', 'info');
            
            // In a real implementation, you would navigate to the full article
            setTimeout(() => {
                showNotification('Feature coming soon!', 'info');
            }, 1000);
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