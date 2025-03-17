# EmailJS Setup Guide for Veronika Raum Website

This guide will walk you through setting up EmailJS to make the contact form fully functional.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. The free plan includes 200 emails per month, which should be sufficient for most small business sites

## Step 2: Connect Your Email Service

1. In the EmailJS dashboard, click on "Email Services" in the left sidebar
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, or custom SMTP)
4. Follow the instructions to authenticate your email account
5. Give your service a name (e.g., "Veronika Raum Contact")
6. Save the Service ID for later use service_dsred9f

## Step 3: Create an Email Template

1. In the EmailJS dashboard, click on "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Give your template a name (e.g., "Contact Form Template")
4. Design your email template using the variables from the contact form:
   - {{name}} - Sender's name
   - {{organization}} - Sender's organization
   - {{email}} - Sender's email
   - {{phone}} - Sender's phone number
   - {{project_type}} - Selected project type
   - {{message}} - Project details message
   - {{timeline}} - Selected project timeline

5. Here's a sample template you can use:

```
Subject: New Project Inquiry from {{name}} ({{organization}})

You've received a new project inquiry from your website:

Name: {{name}}
Organization: {{organization}}
Email: {{email}}
Phone: {{phone}}
Project Type: {{project_type}}
Timeline: {{timeline}}

Message:
{{message}}

---
This email was sent automatically from the contact form on your website.
```

6. Save the template and note the Template ID: template_jyy1gdd

## Step 4: Update the Website Code

1. Open the `contact-form.js` file in your website directory
2. Replace the placeholder values at the top of the file:

```javascript
// EmailJS configuration
const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID'; // Replace with your EmailJS User ID
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your Template ID
```

3. Your EmailJS User ID can be found in your EmailJS dashboard under "Account" > "API Keys"
4. The Service ID was noted in Step 2
5. The Template ID was noted in Step 3

## Step 5: Test the Form

1. Upload all the updated files to your website
2. Fill out the contact form and submit it
3. Check if the email is received at Veronika's email address (vroni@raumonline.de)
4. Make sure all the form data is correctly included in the email

## Troubleshooting

If the form doesn't work:

1. Check the browser console for any JavaScript errors
2. Verify that the EmailJS User ID, Service ID, and Template ID are correct
3. Make sure the email template variables match the form field names
4. Check if there are any CORS issues (though these are usually handled by EmailJS)

## Security Considerations

1. The free plan of EmailJS includes reasonable security for a small business site
2. Your EmailJS User ID is a public key, so it's safe to include in client-side code
3. For higher security needs, consider upgrading to a paid plan with additional features

## Additional Options

1. **Spam Protection**: Consider adding Google reCAPTCHA to the form for added protection
2. **Custom Redirect**: You can modify the form to redirect to a thank-you page after submission
3. **Multiple Recipients**: You can set up the EmailJS template to send to multiple email addresses

If you need assistance with any of these additional options, please refer to the [EmailJS documentation](https://www.emailjs.com/docs/) or contact for support.