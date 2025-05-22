import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Define response type
type ResponseData = {
  success: boolean;
  message: string;
};

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Prepare welcome email
    const welcomeEmail = {
      to: email,
      from: process.env.SMTP_FROM!,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for subscribing, ${name}!</h2>
          <p>We're excited to have you join our newsletter. You'll now receive updates about:</p>
          <ul>
            <li>Latest legal developments</li>
            <li>Firm news and announcements</li>
            <li>Industry insights</li>
            <li>Event invitations</li>
          </ul>
          <p>Best regards,<br>Your Legal Team</p>
        </div>
      `,
    };

    // Prepare notification
    const notification = {
      to: process.env.NOTIFICATION_EMAIL!,
      from: process.env.SMTP_FROM!,
      subject: 'New Newsletter Subscription',
      text: `New subscription from ${email}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Send both emails
    await Promise.all([
      sgMail.send(welcomeEmail),
      sgMail.send(notification)
    ]);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to the newsletter',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process subscription. Please try again later.',
    });
  }
} 