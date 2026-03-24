/**
 * Simplified JavaScript for Peter's Portfolio
 * Replaces the heavy main.70a66962.js with lightweight vanilla JS
 * Includes Bootstrap functionality needed by the HTML files
 */

// ===== CORE FUNCTIONS =====

/**
 * Typing animation for index.html
 * Targets #typed element with strings from #typed-strings
 */
function type() {
    const stringsElement = document.getElementById('typed-strings');
    const typedElement = document.getElementById('typed');
    
    if (!stringsElement || !typedElement) return;
    
    const strings = Array.from(stringsElement.children).map(span => span.textContent);
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentString = strings[currentStringIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentString.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typedElement.textContent = currentString.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentString.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentStringIndex = (currentStringIndex + 1) % strings.length;
            typeSpeed = 500; // Pause before next string
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

/**
 * Active navigation highlighting
 * Used on all pages to highlight current page in navigation
 */
function navActivePage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav li a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if link href matches current page
        const href = link.getAttribute('href');
        if (href === '.' + currentPage || 
            (currentPage === '/' && href === './index.html') ||
            currentPage.includes(href.replace('./', '').replace('.html', ''))) {
            link.classList.add('active');
        }
    });
}

/**
 * Parallax mouse movement effect for hero container
 * Used on index.html for the space background
 */
function movingBackgroundImage() {
    const heroContainer = document.querySelector('.hero-full-container');
    
    if (!heroContainer) return;
    
    const sensitivity = 5;
    
    heroContainer.addEventListener('mousemove', function(e) {
        const rect = heroContainer.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const moveX = ((mouseX - centerX) / centerX) * sensitivity;
        const moveY = ((mouseY - centerY) / centerY) * sensitivity;
        
        heroContainer.style.transform = `translate3d(${-moveX}px, ${-moveY}px, 0)`;
    });
    
    // Reset position when mouse leaves
    heroContainer.addEventListener('mouseleave', function() {
        heroContainer.style.transform = 'translate3d(0, 0, 0)';
    });
}

// ===== BOOTSTRAP COMPONENTS REPLACEMENT =====

/**
 * Mobile Navigation Toggle (Bootstrap Collapse)
 * Handles the hamburger menu on mobile devices
 * Replaces Bootstrap's data-toggle="collapse" functionality
 */
function initMobileNavigation() {
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!toggleButton || !navbarCollapse) return;
    
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Close menu
            navbarCollapse.classList.remove('in');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.add('collapsed');
        } else {
            // Open menu
            navbarCollapse.classList.add('in');
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.classList.remove('collapsed');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggleButton.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('in');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.add('collapsed');
        }
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navbarCollapse.classList.remove('in');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.add('collapsed');
        }
    });
}

/**
 * Bootstrap Carousel functionality for works.html
 * Handles the project carousel with prev/next controls
 */
function initCarousel() {
    const carousel = document.querySelector('#myCarousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-inner .item');
    const prevBtn = carousel.querySelector('.left.carousel-control');
    const nextBtn = carousel.querySelector('.right.carousel-control');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
    });
    
    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
}

// ===== ADDITIONAL ENHANCEMENTS =====

/**
 * Form validation and enhancement
 * For contact.html form
 */
function initFormEnhancements() {
    const form = document.querySelector('form[action*="formsubmit"]');
    if (!form) return;
    
    const emailInput = form.querySelector('input[type="email"]');
    const subjectInput = form.querySelector('input[type="text"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add real-time validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
      function validateForm() {
        const isEmailValid = emailInput && validateEmail(emailInput.value);
        const isSubjectValid = subjectInput && subjectInput.value.trim().length > 0;
        const isMessageValid = messageInput && messageInput.value.trim().length > 0;
        
        const isFormValid = isEmailValid && isSubjectValid && isMessageValid;
        
        if (submitBtn) {
            submitBtn.disabled = !isFormValid;
            submitBtn.style.opacity = isFormValid ? '1' : '0.6';
        }
        
        return isFormValid;
    }
    
    // Add event listeners for real-time validation
    [emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', validateForm);
            input.addEventListener('blur', validateForm);
        }
    });
      // Form submission handling
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
                return false;
            }
            
            // Add loading state
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }
    
    // Initial validation
    setTimeout(validateForm, 100);
}

/**
 * Smooth scrolling for anchor links
 * Enhanced navigation experience
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Image lazy loading and optimization
 * Improves page loading performance
 */
function initImageOptimization() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

/**
 * Simple fade-in animations
 * Adds visual appeal to content loading
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.card-container, .section-container-spacer, .template-example');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Core functions
    navActivePage();
    
    // Bootstrap component replacements
    initMobileNavigation();
    initCarousel();
    
    // Enhancements
    initFormEnhancements();
    initSmoothScrolling();
    initImageOptimization();
    initAnimations();
    
    // Page-specific functions
    const currentPage = window.location.pathname;
    if (currentPage === '/' || currentPage.includes('index.html')) {
        type();
        movingBackgroundImage();
    }
});

// Re-highlight navigation on page changes (for SPAs)
window.addEventListener('popstate', navActivePage);

// ===== GLOBAL FUNCTION EXPORTS =====
// Export functions to maintain compatibility with existing HTML inline scripts

// Make functions globally accessible for HTML script tags
window.type = type;
window.navActivePage = navActivePage;
window.movingBackgroundImage = movingBackgroundImage;

// Export object for advanced usage
window.portfolioJS = {
    type: type,
    navActivePage: navActivePage,
    movingBackgroundImage: movingBackgroundImage,
    initMobileNavigation: initMobileNavigation,
    initCarousel: initCarousel,
    initFormEnhancements: initFormEnhancements
};
