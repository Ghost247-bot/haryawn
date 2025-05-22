import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messageId, emoji } = req.body;

    if (!messageId || !emoji) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get current message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Get current reactions or initialize empty object
    const currentReactions = message.reactions as { [key: string]: number } || {};

    // Update reaction count
    currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;

    // Update message with new reactions
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { reactions: currentReactions },
    });

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error handling reaction:', error);
    res.status(500).json({ error: 'Failed to process reaction' });
  }
} 