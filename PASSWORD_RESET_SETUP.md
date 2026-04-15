# Password Reset Feature - Setup Guide

## Overview
The password reset feature has been added to your Nexora Lift application with the following components:

1. **Forgot Password Page** - A new page where users can request a password reset
2. **Password Reset Email** - Firebase sends an official password reset link to the user's email
3. **Support Notification** - A formal email is sent to nexoralift@nexoralift.com notifying about the reset request

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

This will install the `@emailjs/browser` package along with other dependencies.

### Step 2: Configure EmailJS

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account
   - Complete your email verification

2. **Get Your Credentials**
   - **Public Key**: Go to Account > API Keys and copy your public key
   - **Service ID**: Set up an email service (Gmail, Outlook, or custom SMTP)
   - **Template ID**: Create an email template for password reset notifications

3. **Create an Email Template**
   - Go to Email Templates and create a new template
   - Name it something like "Password Reset Notification"
   - Use the following template variables in your template:
     ```
     {{to_email}}
     {{user_email}}
     {{message}}
     {{subject}}
     {{timestamp}}
     ```

### Step 3: Update Configuration

Update the file `src/utils/emailService.js` with your credentials:

```javascript
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key_here'
const EMAILJS_SERVICE_ID = 'service_xxxxxxxxxxxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxxxxxxxxxx'
```

### Step 4: Update Email Address

In `src/utils/emailService.js`, update the support email address:

```javascript
const params = {
  to_email: 'your-support-email@nexoralift.com', // Change this to your actual support email
  // ... rest of params
}
```

### Step 5: Configure Firebase

The password reset feature uses Firebase's built-in `sendPasswordResetEmail()` function. Make sure your Firebase project is properly configured (it should be already based on your setup).

## Features

### User-Facing Features:
1. **Password Reset Link** - User receives an email with a Firebase password reset link
2. **User-Friendly UI** - Clean password reset form with validation
3. **Success Messaging** - User gets confirmation that the reset email was sent
4. **Error Handling** - Comprehensive error messages for various scenarios

### Admin Notification Features:
1. **Reset Requests Tracking** - Support team receives formal notifications of password reset requests
2. **User Context** - Each notification includes the user's email and timestamp
3. **Professional Format** - Formal HTML email template

## File Structure

```
src/
├── pages/
│   ├── ForgotPasswordPage.jsx    # New password reset page
│   ├── LoginPage.jsx             # Updated with "Forgot Password?" link
│   └── AuthPages.css             # Updated with new styles
├── utils/
│   └── emailService.js           # New email service utility
└── App.jsx                       # Updated routing
```

## Flow Diagram

```
User visits /forgot-password
    ↓
Enters email address
    ↓
Submits form
    ↓
├─ Firebase sends password reset email to user
├─ EmailJS sends notification to nexoralift@nexoralift.com
    ↓
User sees success message
    ↓
Redirects to login (after 3 seconds)
```

## Testing

### Test Email Reset:
1. Navigate to http://localhost:5173/login
2. Click "Forgot Password?" link
3. Enter a valid registered email
4. Check the user's email for Firebase password reset link
5. Check the support email (nexoralift@nexoralift.com) for notification

### Expected Emails:

**User Email (from Firebase):**
- Contains a password reset link
- Sent immediately when request is made

**Support Email (from EmailJS):**
- Professional HTML formatted message
- Contains user's email address
- Includes request timestamp
- Sent as notification to support team

## Troubleshooting

### Issue: "Invalid EmailJS credentials"
- **Solution**: Check that `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID` are correctly set in `emailService.js`

### Issue: Email not received
- **Solution**: 
  - Check that your email service is properly configured in EmailJS
  - Check spam/junk folders
  - Verify the recipient email address is correct

### Issue: CORS errors
- **Solution**: EmailJS is client-side, but make sure your public key is added to EmailJS allowed domains if needed

### Issue: User receives Firebase reset email but support doesn't receive notification
- **Solution**: This is expected if EmailJS is not configured. The password reset still works via Firebase; the notification is optional.

## Security Notes

1. **Public Key Safety**: The EmailJS public key is intentionally public and safe to use client-side
2. **Password Security**: Passwords are never transmitted in emails - only reset links
3. **Firebase Protection**: All password reset links are automatically generated and expire after 24 hours

## Future Enhancements

1. Add rate limiting to prevent abuse
2. Add CAPTCHA to the reset form
3. Send multiple reset codes/links
4. Add password reset history
5. Implement SMS notifications
