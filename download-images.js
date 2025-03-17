/**
 * Script to download the missing expertise image
 */
const fs = require('fs-extra');
const path = require('path');
const https = require('https');

// Output directory
const OUTPUT_DIR = 'images';

// Make sure directory exists
fs.ensureDirSync(OUTPUT_DIR);

// Updated URL for the expertise image
const expertiseImage = {
    name: 'expertise-1.jpg',
    url: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=1',
    attribution: 'Photo by Mart Production from Pexels'
};

/**
 * Download an image from a URL and save it to the specified path
 */
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download image: ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
            
            fileStream.on('error', (err) => {
                fs.unlink(filepath, () => {}); // Delete the file if there was an error
                reject(err);
            });
        }).on('error', reject);
    });
}

/**
 * Update the attribution file with the new image information
 */
function updateAttributionFile(attributionPath, image) {
    // Read existing attribution file if it exists
    let attributionHtml = '';
    if (fs.existsSync(attributionPath)) {
        attributionHtml = fs.readFileSync(attributionPath, 'utf8');
        
        // Replace the closing </ul> tag to add our new entry
        attributionHtml = attributionHtml.replace('</ul>', 
            `<li><strong>${image.name}</strong> - ${image.attribution}</li>\n</ul>`);
    } else {
        // Create a new attribution file if it doesn't exist
        attributionHtml = '<html><head><title>Image Attribution</title>';
        attributionHtml += '<style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px}h1{color:#0A5B7A}h2{color:#1D9BBA;margin-top:30px}ul{padding-left:20px}li{margin-bottom:10px}</style>';
        attributionHtml += '</head><body>';
        attributionHtml += '<h1>Image Attribution</h1>';
        attributionHtml += '<p>The following images are used in the Veronika Raum website.</p>';
        attributionHtml += '<ul>';
        attributionHtml += `<li><strong>${image.name}</strong> - ${image.attribution}</li>`;
        attributionHtml += '</ul></body></html>';
    }
    
    // Write the updated attribution file
    fs.writeFileSync(attributionPath, attributionHtml);
}

// Download the expertise image
async function downloadExpertiseImage() {
    console.log('Downloading missing expertise image...');
    const filepath = path.join(OUTPUT_DIR, expertiseImage.name);
    const attributionPath = path.join(OUTPUT_DIR, 'attribution.html');
    
    try {
        await downloadImage(expertiseImage.url, filepath);
        console.log(`Downloaded ${expertiseImage.name} successfully!`);
        
        // Update the attribution file
        updateAttributionFile(attributionPath, expertiseImage);
        console.log('Attribution file updated.');
        
        console.log('\nAll images should now be complete. Refresh your website to see the changes.');
    } catch (error) {
        console.error(`Error downloading expertise image:`, error);
        console.log('\nTroubleshooting:');
        console.log('- Check your internet connection');
        console.log('- Try downloading an alternative image manually and saving it as "expertise-1.jpg" in the images folder');
    }
}

// Run the script
downloadExpertiseImage().catch(error => {
    console.error('Error in main process:', error);
});