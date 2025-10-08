# EmailJS Setup Guide for Contact Form

Your contact form is now ready to send real emails! Follow these steps to configure EmailJS:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the sidebar
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. **Copy the Service ID** (you'll need this later)

### For Gmail:
- Click "Connect Account"
- Sign in with your Gmail
- Allow EmailJS to send emails on your behalf

## Step 3: Create Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Important**: The variable names ({{name}}, {{email}}, {{subject}}, {{message}}) must match the input field names in your form
5. Click **Save**
6. **Copy the Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** in the sidebar
2. Find **API Keys** section
3. **Copy your Public Key**

## Step 5: Update Your Code

Open `src/components/Contact.jsx` and replace these values around line 48-50:

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID'      // Replace with your Service ID from Step 2
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'    // Replace with your Template ID from Step 3
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'      // Replace with your Public Key from Step 4
```

## Step 6: Test Your Form

1. Save the file
2. Fill out the contact form on your website
3. Click "Send Message"
4. Check your email inbox for the message!

## Example Configuration:

```javascript
const SERVICE_ID = 'service_abc1234'
const TEMPLATE_ID = 'template_xyz5678'
const PUBLIC_KEY = 'AbCdEfGhIjKlMnOp'
```

## Troubleshooting:

### Form not sending?
- Check browser console for errors
- Verify all three IDs are correct
- Make sure your EmailJS service is connected and active

### Emails going to spam?
- Add your portfolio domain to EmailJS allowed domains
- Use a custom email template with proper formatting

### Monthly limit reached?
- Free plan: 200 emails/month
- Upgrade to paid plan for more emails

## Security Note:

The public key is safe to use in client-side code. EmailJS designed it to be public. However, consider adding:

1. **Rate limiting** to prevent abuse
2. **reCAPTCHA** to prevent spam
3. **Domain restrictions** in EmailJS dashboard

## Free Plan Limits:

- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Basic support

This is perfect for a personal portfolio!

---

**Need Help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: Contact through their website

**Your form is ready! Just complete the setup above and you'll start receiving emails from your portfolio visitors! 📧✨**
