document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();  
    // Theme toggle functionality
    initializeThemeToggle();    
    // Mobile menu functionality
    initializeMobileMenu();   
    // Generate stars background
    generateStars();   
    // Add smooth scrolling and animations
    initializeAnimations();
});

// Initialize page with saved theme preference
function initializePage() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
    }
    
    // Add fade-in animation to main content
    setTimeout(() => {
        document.querySelector('main').classList.add('fade-in');
    }, 100);
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        document.documentElement.classList.toggle('light-mode');
        
        // Save theme preference
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        // Add button click effect
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Regenerate stars with new colors
        setTimeout(() => {
            generateStars();
        }, 300);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle menu icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-white';
        } else {
            icon.className = 'fas fa-times text-white';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-white';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars text-white';
        }
    });
}

// Generate animated stars background
function generateStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = ''; // Clear existing stars   
    const starCount = window.innerWidth < 999 ? 50 : 100;    
    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Random size (1px to 3px)
    const size = Math.random() * 7 + 1;
    
    // Random animation delay
    const delay = Math.random() * 3;
    
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;
    
    container.appendChild(star);
}

// Initialize animations and interactions
function initializeAnimations() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('bg-cyan-400')) {
                this.classList.add('button-glow');
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('button-glow');
        });
    });
    
    // Add click effects to social links
    const socialLinks = document.querySelectorAll('a[href="#"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(6, 182, 212, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
            }, 600);
        });
    });
    
    // Parallax effect for profile image
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImage) {
            const rate = scrolled * -0.5;
            profileImage.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Regenerate stars on window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        generateStars();
    }, 250);
});

// Add CSS keyframes for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Reduce animations on low-performance devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-motion');
}

// Add reduced motion CSS
const reducedMotionStyle = document.createElement('style');
reducedMotionStyle.textContent = `
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(reducedMotionStyle);