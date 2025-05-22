import { supabase } from '../../../lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messageId, reaction } = req.body;

    // Get the current message
    const { data: message, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .eq('id', messageId)
      .single();

    if (fetchError) throw fetchError;
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Update the message with the new reaction
    const { data: updatedMessage, error: updateError } = await supabase
      .from('messages')
      .update({ reaction })
      .eq('id', messageId)
      .select()
      .single();

    if (updateError) throw updateError;

    return res.status(200).json({ message: updatedMessage });
  } catch (error) {
    console.error('Error updating message reaction:', error);
    return res.status(500).json({ 
      error: 'Failed to update message reaction',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 