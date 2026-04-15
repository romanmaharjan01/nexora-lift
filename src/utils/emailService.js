import emailjs from '@emailjs/browser'

// Initialize EmailJS (you need to add your public key)
// Sign up at https://www.emailjs.com/ and get your public key
const EMAILJS_PUBLIC_KEY = 'your_emailjs_public_key_here'
const EMAILJS_SERVICE_ID = 'service_xxx' // You'll get this from EmailJS
const EMAILJS_TEMPLATE_ID = 'template_xxx' // You'll get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export const sendPasswordResetNotification = async (userEmail) => {
  try {
    // Formal message to send to nexoralift support
    const messageContent = `
      <h2>Password Reset Request</h2>
      <p>A user has requested a password reset for their account.</p>
      <p><strong>Email Address:</strong> ${userEmail}</p>
      <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
      <p>A password reset link has been sent to this email address.</p>
      <hr>
      <p><em>This is an automated notification from the Nexora Lift system.</em></p>
    `

    const params = {
      to_email: 'nexoralift@nexoralift.com', // Support email
      user_email: userEmail,
      message: messageContent,
      subject: `[Nexora Lift] Password Reset Request from ${userEmail}`,
      timestamp: new Date().toLocaleString(),
    }

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params
    )

    console.log('Reset notification sent successfully:', response)
    return { success: true, message: 'Notification sent to support' }
  } catch (error) {
    console.error('Error sending reset notification:', error)
    // Don't throw error - password reset was still successful
    return { success: false, error: error.message }
  }
}

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const messageContent = `
      <h2>Welcome to Nexora Lift!</h2>
      <p>Dear ${userName},</p>
      <p>Your account has been successfully created.</p>
      <p>If you have any questions or need support, please don't hesitate to reach out to us at <strong>nexoralift@nexoralift.com</strong></p>
      <p>Best regards,<br>The Nexora Lift Team</p>
    `

    const params = {
      to_email: userEmail,
      user_name: userName,
      message: messageContent,
      subject: 'Welcome to Nexora Lift!',
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params
    )

    console.log('Welcome email sent:', response)
    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error: error.message }
  }
}
