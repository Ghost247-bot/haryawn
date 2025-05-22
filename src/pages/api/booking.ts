import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { isWeekend, isValid, addMonths, isBefore, isAfter } from 'date-fns';
import { supabase } from '../../lib/supabase';

// Initialize SendGrid with API key if available
if (process.env.SENDGRID_API_KEY?.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ResponseData {
  success: boolean;
  message: string;
  errors?: string[];
  id?: string;
}

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function getClientIp(req: NextApiRequest): string {
  return req.headers['x-forwarded-for']?.toString() || 
         req.socket.remoteAddress || 
         'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimit.get(ip);

  if (!clientData) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - clientData.timestamp > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (clientData.count >= MAX_REQUESTS) {
    return true;
  }

  clientData.count++;
  return false;
}

// Format date to a readable string
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

// Validate time slot format and availability
const isValidTimeSlot = (time: string): boolean => {
  const validTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  return validTimes.includes(time);
};

// Validate practice area
const isValidPracticeArea = (area: string): boolean => {
  const validAreas = [
    'Corporate Law',
    'Intellectual Property',
    'Employment Law',
    'Real Estate',
    'Litigation',
    'Family Law',
    'Criminal Defense',
    'Immigration',
    'Other'
  ];
  return validAreas.includes(area);
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
    // Apply rate limiting
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        success: false,
        message: 'Too many booking requests. Please try again after an hour.',
      });
    }

    const { name, email, phone, date, time, practiceArea, message } = req.body;
    const errors: string[] = [];

    // Validate required fields
    if (!name?.trim()) errors.push('Name is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!phone?.trim()) errors.push('Phone number is required');
    if (!date?.trim()) errors.push('Date is required');
    if (!time?.trim()) errors.push('Time is required');
    if (!practiceArea?.trim()) errors.push('Practice area is required');

    // Validate email format
    if (email && !isValidEmail(email)) {
      errors.push('Invalid email format');
    }

    // Validate phone format
    if (phone && !isValidPhone(phone)) {
      errors.push('Invalid phone number format');
    }

    // Validate date
    const bookingDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = addMonths(new Date(), 3);

    if (!isValid(bookingDate)) {
      errors.push('Invalid date format');
    } else {
      if (isWeekend(bookingDate)) {
        errors.push('Bookings are not available on weekends');
      }
      if (isBefore(bookingDate, tomorrow)) {
        errors.push('Booking date must be at least 1 day in advance');
      }
      if (isAfter(bookingDate, maxDate)) {
        errors.push('Booking date cannot be more than 3 months in advance');
      }
    }

    // Validate time slot
    if (time && !isValidTimeSlot(time)) {
      errors.push('Invalid time slot selected');
    }

    // Validate practice area
    if (practiceArea && !isValidPracticeArea(practiceArea)) {
      errors.push('Invalid practice area selected');
    }

    // Return if there are validation errors
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create appointment in Supabase
    const { data: appointmentData, error: supabaseError } = await supabase
      .from('appointments')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          date: date,
          time,
          practice_area: practiceArea,
          message: message || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        }
      ])
      .select('id')
      .single();

    if (supabaseError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create appointment',
        errors: [supabaseError.message],
      });
    }

    // Try to send emails if SendGrid is properly configured
    if (process.env.SENDGRID_API_KEY?.startsWith('SG.') && process.env.SMTP_FROM && process.env.NOTIFICATION_EMAIL) {
      try {
        // Prepare client confirmation email
        const clientEmail = {
          to: email,
          from: process.env.SMTP_FROM,
          subject: 'Consultation Booking Confirmation - Haryawn Law Firm',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1e40af;">Consultation Booking Confirmation</h2>
              <p>Dear ${name},</p>
              <p>Thank you for booking a consultation with Haryawn Law Firm. Here are your booking details:</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Date:</strong> ${formatDate(date)}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Practice Area:</strong> ${practiceArea}</p>
              </div>

              <p>Our team will review your booking and contact you shortly to confirm your appointment. If you need to make any changes or have questions, please don't hesitate to contact us.</p>
              
              ${message ? `
              <div style="margin-top: 20px;">
                <p><strong>Your Message:</strong></p>
                <p style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">${message}</p>
              </div>
              ` : ''}
              
              <p style="margin-top: 20px; color: #4b5563; font-size: 0.875rem;">
                Please note:
                <ul style="margin-top: 0.5rem;">
                  <li>Your booking is pending confirmation from our team</li>
                  <li>We will contact you within 24 hours to confirm your appointment</li>
                  <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
                </ul>
              </p>
              
              <p style="margin-top: 20px;">Best regards,<br>Haryawn Law Firm</p>
            </div>
          `,
        };

        // Prepare notification email
        const notificationEmail = {
          to: process.env.NOTIFICATION_EMAIL,
          from: process.env.SMTP_FROM,
          subject: 'New Appointment Request',
          text: `New appointment request from ${name} (${email})`,
          html: `
            <h2>New Appointment Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Practice Area:</strong> ${practiceArea}</p>
            <p><strong>Message:</strong> ${message || 'No message provided'}</p>
          `
        };

        // Send both emails
        await Promise.all([
          sgMail.send(clientEmail),
          sgMail.send(notificationEmail)
        ]);
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Log the error but don't fail the booking
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Appointment scheduled successfully',
      id: appointmentData?.id,
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your booking. Please try again later.',
      errors: [(error as Error).message]
    });
  }
} 