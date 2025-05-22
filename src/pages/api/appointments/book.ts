import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { withErrorHandler } from '../../../middleware/error';
import { withRateLimit } from '../../../middleware/rateLimit';
import logger from '../../../utils/logger';

// First, let's add the Appointment model to our Prisma schema
// You'll need to run 'npx prisma migrate dev' after adding this
/*
model Appointment {
  id          String   @id @default(uuid())
  name        String
  email       String
  phone       String?
  date        DateTime
  time        String
  service     String
  notes       String?
  status      String   @default("pending") // pending, confirmed, cancelled
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
*/

async function validateAppointment(data: any) {
  const errors: string[] = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.date) {
    errors.push('Please select an appointment date');
  }
  
  if (!data.time) {
    errors.push('Please select an appointment time');
  }
  
  if (!data.service) {
    errors.push('Please select a service');
  }

  // Validate that the appointment date is in the future
  const appointmentDate = new Date(data.date + 'T' + data.time);
  if (appointmentDate <= new Date()) {
    errors.push('Appointment must be scheduled for a future date and time');
  }

  return errors;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    logger.warn('Invalid method for appointment booking', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, date, time, service, notes } = req.body;
    
    // Validate input
    const validationErrors = await validateAppointment(req.body);
    if (validationErrors.length > 0) {
      logger.warn('Appointment validation failed', { errors: validationErrors });
      return res.status(400).json({ errors: validationErrors });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone: phone || null,
        date: new Date(date + 'T' + time),
        time,
        service,
        notes: notes || null,
        status: 'pending'
      }
    });

    logger.info('Appointment created', { 
      appointmentId: appointment.id,
      email: appointment.email,
      date: appointment.date
    });

    return res.status(200).json({
      message: 'Appointment scheduled successfully',
      id: appointment.id
    });
  } catch (error) {
    logger.error('Error handling appointment booking', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export default withErrorHandler(withRateLimit(handler, {
  maxRequests: 10, // Stricter rate limit for appointments
  windowMs: 60 * 1000 // per minute
})); 