/**
 * Image Loader for Veronika Raum Website
 * 
 * This script checks if the required images are available and
 * shows a friendly message if they're not.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're missing any key images
    const testImage = new Image();
    testImage.onload = function() {
        // Image exists, do nothing (normal website operation)
        document.getElementById('image-loading-message').style.display = 'none';
    };
    
    testImage.onerror = function() {
        // Image doesn't exist, show the message
        document.getElementById('image-loading-message').style.display = 'flex';
    };
    
    // Try to load the hero image as a test
    testImage.src = 'images/hero-1.jpg';
});