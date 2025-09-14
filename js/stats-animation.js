// Enhanced Statistics Animation
class StatsAnimator {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.setupCounterAnimation();
        this.setupStaggeredReveal();
    }

    setupCounterAnimation() {
        const statNumbers = document.querySelectorAll('.stat h2');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });

        this.observers.push(observer);
    }

    animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (isNaN(numericValue)) return;

        let currentValue = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const frameTime = duration / 60;

        element.textContent = '0' + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');

        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }

            const displayValue = Math.floor(currentValue);
            element.textContent = displayValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
        }, frameTime);
    }

    setupStaggeredReveal() {
        const statCards = document.querySelectorAll('.stat');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                        entry.target.style.animation = `slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
                    }, index * 200); // Stagger by 200ms
                }
            });
        }, observerOptions);

        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            observer.observe(card);
        });

        this.observers.push(observer);
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Add slide-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .stat.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Enhanced hover effects */
    .stat:hover {
        animation: statHover 0.6s ease forwards;
    }

    @keyframes statHover {
        0% {
            transform: translateY(-10px) scale(1.05);
        }
        50% {
            transform: translateY(-15px) scale(1.08);
        }
        100% {
            transform: translateY(-10px) scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Initialize the stats animator
const statsAnimator = new StatsAnimator();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    statsAnimator.destroy();
});