import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get count of contact messages
    const count = await prisma.contactMessage.count();
    
    res.status(200).json({ 
      success: true, 
      message: 'Database connection successful',
      contactMessagesCount: count
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 