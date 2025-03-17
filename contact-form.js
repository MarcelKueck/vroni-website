/**
 * Contact Form Handler for Veronika Raum Website
 * Using EmailJS (https://www.emailjs.com/) to send emails without server-side code
 */

// EmailJS configuration
const EMAILJS_USER_ID = 'LYjMkfQK8zFVUO1Ep'; // Replace with your EmailJS User ID
const EMAILJS_SERVICE_ID = 'service_dsred9f'; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_jyy1gdd'; // Replace with your EmailJS Template ID

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('medical-project-form');
    const submitButton = document.querySelector('.submit-button');
    
    if (!contactForm) return;
    
    // Initialize EmailJS with your user ID
    emailjs.init(EMAILJS_USER_ID);
    
    // Form submission event
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (!validateForm(contactForm)) {
            return;
        }
        
        // Change button text and disable
        submitButton.textContent = getCurrentLanguage() === 'de' ? 'Wird gesendet...' : 'Sending...';
        submitButton.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            name: contactForm.elements.name.value,
            organization: contactForm.elements.organization.value,
            email: contactForm.elements.email.value,
            phone: contactForm.elements.phone.value,
            project_type: contactForm.elements['project-type'].value,
            message: contactForm.elements.message.value,
            timeline: contactForm.elements.timeline.value || 'Not specified'
        };
        
        // Send the email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                showFormMessage(true);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = getCurrentLanguage() === 'de' ? 'Anfrage einreichen' : 'Submit Inquiry';
                }, 3000);
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                showFormMessage(false);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = getCurrentLanguage() === 'de' ? 'Anfrage einreichen' : 'Submit Inquiry';
            });
    });
    
    // Get current language from translations.js if available
    function getCurrentLanguage() {
        // If translations.js is not loaded or currentLanguage is not defined, default to 'en'
        return (typeof currentLanguage !== 'undefined') ? currentLanguage : 'en';
    }
    
    // Form validation
    function validateForm(form) {
        let isValid = true;
        
        // Reset any previous error messages
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        
        // Required fields
        const requiredFields = ['name', 'organization', 'email', 'message', 'project-type'];
        
        requiredFields.forEach(field => {
            const element = form.elements[field];
            if (!element.value.trim()) {
                showError(element, getCurrentLanguage() === 'de' ? 'Dieses Feld ist erforderlich' : 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        const email = form.elements.email.value.trim();
        if (email && !isValidEmail(email)) {
            showError(
                form.elements.email, 
                getCurrentLanguage() === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : 'Please enter a valid email address'
            );
            isValid = false;
        }
        
        // Consent checkbox
        if (!form.elements.consent.checked) {
            showError(
                form.elements.consent, 
                getCurrentLanguage() === 'de' ? 'Sie müssen den Datenschutzbestimmungen zustimmen' : 'You must agree to the privacy policy'
            );
            isValid = false;
        }
        
        return isValid;
    }
    
    // Display an error message for a form field
    function showError(element, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        // For checkbox, insert after the label
        if (element.type === 'checkbox') {
            element.parentNode.insertAdjacentElement('afterend', errorElement);
        } else {
            element.insertAdjacentElement('afterend', errorElement);
        }
        
        // Highlight the field
        element.classList.add('error-field');
        
        // Remove error on input change
        element.addEventListener('input', function() {
            errorElement.remove();
            element.classList.remove('error-field');
        }, { once: true });
    }
    
    // Validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Show form submission message (success or error)
    function showFormMessage(success) {
        // Create message container if it doesn't exist
        let messageContainer = document.querySelector('.form-message');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            contactForm.parentNode.insertBefore(messageContainer, contactForm.nextSibling);
        }
        
        // Set message content based on success/error
        if (success) {
            messageContainer.className = 'form-message success';
            messageContainer.textContent = getCurrentLanguage() === 'de' 
                ? 'Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.' 
                : 'Thank you for your inquiry! We will get back to you shortly.';
        } else {
            messageContainer.className = 'form-message error';
            messageContainer.textContent = getCurrentLanguage() === 'de' 
                ? 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns direkt per E-Mail.' 
                : 'There was an issue sending your message. Please try again later or contact us directly via email.';
        }
        
        // Scroll to the message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after a delay on success
        if (success) {
            setTimeout(() => {
                messageContainer.style.opacity = '0';
                setTimeout(() => messageContainer.remove(), 500);
            }, 5000);
        }
    }
});