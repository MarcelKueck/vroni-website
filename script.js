document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuIcon.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        
        // Toggle between menu and close icons
        const icon = mobileMenuIcon.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to the clicked button
            button.classList.add('active');
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('medical-project-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulating form submission
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.innerHTML = 'Message Sent!';
                submitButton.style.backgroundColor = '#34C759';
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = 'Submit Inquiry';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        mobileMenuIcon.querySelector('i').classList.remove('fa-times');
                        mobileMenuIcon.querySelector('i').classList.add('fa-bars');
                    }
                    
                    // Scroll to element
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add CSS for mobile menu toggle
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav ul {
                position: fixed;
                background-color: white;
                top: 80px;
                left: 0;
                width: 100%;
                flex-direction: column;
                align-items: center;
                padding: 2rem 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.4s ease;
                z-index: 10;
            }
            
            nav ul.show {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
                display: flex;
            }
            
            nav ul li {
                margin: 0.8rem 0;
            }
            
            nav ul li a.cta-button {
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});