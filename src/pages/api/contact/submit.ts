import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { withRateLimit } from '../../../middleware/rateLimit';
import logger from '../../../utils/logger';

async function validateContactForm(data: any) {
  const errors: string[] = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.subject || data.subject.length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    logger.warn('Invalid method for contact submission', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate input
    const validationErrors = await validateContactForm(req.body);
    if (validationErrors.length > 0) {
      logger.warn('Contact form validation failed', { errors: validationErrors });
      return res.status(400).json({ errors: validationErrors });
    }

    // Create contact message in Supabase
    const { data: contactData, error: supabaseError } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          status: 'pending',
          created_at: new Date().toISOString(),
        }
      ])
      .select('id')
      .single();

    if (supabaseError) {
      logger.error('Error creating contact message', { error: supabaseError.message });
      return res.status(500).json({
        message: 'Failed to create contact message',
        errors: [supabaseError.message],
      });
    }

    logger.info('Contact message created', { 
      messageId: contactData?.id,
      email: email 
    });

    return res.status(200).json({
      message: 'Contact message received successfully',
      id: contactData?.id
    });
  } catch (error) {
    logger.error('Error handling contact submission', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export default withErrorHandler(withRateLimit(handler, {
  maxRequests: 10, // Stricter rate limit for contact form
  windowMs: 60 * 1000 // per minute
})); 