/**
 * Scroll Effects for Veronika Raum Website
 * 
 * This script adds dynamic scroll-based animations and effects
 * inspired by premium websites like Apple.
 */

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all scroll effects
    initParallaxEffects();
    initRevealAnimations();
    initStickyElements();
    initProgressIndicator();
    initImageZoom();
    initCounterAnimations();
    initHorizontalScroll();
});

/**
 * Parallax scrolling effect for the hero section
 */
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-overlay .container');
    
    if (!heroImage || !heroContent) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero image (slower scroll)
        if (scrollPosition <= window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
        }
    });
}

/**
 * Reveal animations for elements as they enter the viewport
 */
function initRevealAnimations() {
    // Add reveal classes to elements we want to animate
    const revealElements = [
        '.focus-card', 
        '.case-card', 
        '.expertise-content > div', 
        '.equipment-item',
        '.service-category',
        '.process-step',
        '.resource-card',
        '.client-category'
    ];
    
    // Add reveal classes to elements
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Create intersection observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // stop observing once revealed
            }
        });
    }, observerOptions);
    
    // Observe all elements with the reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Sticky section titles and elements
 */
function initStickyElements() {
    // Make section titles sticky
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const section = title.closest('section');
        if (!section) return;
        
        const stickyWrapper = document.createElement('div');
        stickyWrapper.classList.add('sticky-title-wrapper');
        
        // Clone the title for the sticky version
        const stickyTitle = title.cloneNode(true);
        stickyTitle.classList.add('sticky-title');
        
        stickyWrapper.appendChild(stickyTitle);
        section.insertBefore(stickyWrapper, section.firstChild);
        
        // Hide by default
        stickyTitle.style.opacity = '0';
        
        // Create observer to handle the sticky behavior
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When original title goes out of view
                if (!entry.isIntersecting) {
                    stickyTitle.style.opacity = '1';
                } else {
                    stickyTitle.style.opacity = '0';
                }
            });
        }, { 
            threshold: 0,
            rootMargin: '-100px 0px 0px 0px' 
        });
        
        observer.observe(title);
    });
}

/**
 * Scroll progress indicator
 */
function initProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

/**
 * Subtle zoom effect for images when scrolled into view
 */
function initImageZoom() {
    const images = document.querySelectorAll('.portfolio-image img, .case-image img, .about-image img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zoom-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    images.forEach(img => {
        img.classList.add('zoom-image');
        observer.observe(img);
    });
}

/**
 * Animated counters for stats
 */
function initCounterAnimations() {
    // Add this simple stat section programmatically before the testimonial
    const testimonialSection = document.getElementById('testimonial');
    if (!testimonialSection) return;
    
    const statsSection = document.createElement('section');
    statsSection.id = 'stats';
    statsSection.classList.add('section-padding');
    
    statsSection.innerHTML = `
        <div class="container">
            <div class="stats-container">
                <div class="stat-item reveal">
                    <div class="stat-number" data-count="100">0</div>
                    <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item reveal">
                    <div class="stat-number" data-count="40">0</div>
                    <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat-item reveal">
                    <div class="stat-number" data-count="85">0</div>
                    <div class="stat-label">Patient Satisfaction</div>
                </div>
                <div class="stat-item reveal">
                    <div class="stat-number" data-count="8">0</div>
                    <div class="stat-label">Years Experience</div>
                </div>
            </div>
        </div>
    `;
    
    testimonialSection.parentNode.insertBefore(statsSection, testimonialSection);
    
    // Animation for counter
    const counterElements = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                
                let current = 0;
                const increment = Math.max(1, Math.floor(count / 50)); // Faster for larger numbers
                const duration = 1500; // ms
                const steps = Math.ceil(duration / 30); // 30ms per step
                const step = Math.max(1, Math.floor(count / steps));
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = current;
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Horizontal scrolling for portfolio section
 */
function initHorizontalScroll() {
    // We'll convert the portfolio grid to horizontal scrolling
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Add wrapper for horizontal scroll
    const wrapper = document.createElement('div');
    wrapper.classList.add('horizontal-scroll-wrapper');
    
    // Replace the grid with the wrapper
    portfolioGrid.parentNode.insertBefore(wrapper, portfolioGrid);
    wrapper.appendChild(portfolioGrid);
    
    // Change grid to flex for horizontal layout
    portfolioGrid.style.display = 'flex';
    portfolioGrid.style.flexWrap = 'nowrap';
    portfolioGrid.style.overflowX = 'auto';
    portfolioGrid.style.scrollSnapType = 'x mandatory';
    portfolioGrid.style.padding = '30px 0';
    
    // Adjust portfolio items
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.flex = '0 0 auto';
        item.style.width = '350px';
        item.style.marginRight = '30px';
        item.style.scrollSnapAlign = 'start';
    });
    
    // Create scroll indicator
    const indicator = document.createElement('div');
    indicator.classList.add('horizontal-scroll-indicator');
    wrapper.appendChild(indicator);
    
    // Update indicator based on scroll position
    portfolioGrid.addEventListener('scroll', () => {
        const scrollPercentage = (portfolioGrid.scrollLeft / (portfolioGrid.scrollWidth - portfolioGrid.clientWidth)) * 100;
        indicator.style.width = `${scrollPercentage}%`;
    });
    
    // Add touch-based scrolling hint for mobile
    if ('ontouchstart' in window) {
        const touchHint = document.createElement('div');
        touchHint.classList.add('touch-scroll-hint');
        touchHint.innerHTML = '<i class="fas fa-arrow-right"></i> <span>Swipe to explore more</span>';
        wrapper.appendChild(touchHint);
        
        // Hide hint after user has scrolled
        portfolioGrid.addEventListener('scroll', () => {
            if (portfolioGrid.scrollLeft > 50) {
                touchHint.classList.add('hide');
            }
        }, { once: true });
    }
}