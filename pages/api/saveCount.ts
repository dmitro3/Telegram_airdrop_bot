import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { count } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('flappy_game');
    const collection = db.collection('scores');

    const result = await collection.insertOne({ count, timestamp: new Date() });

    res.status(200).json({ message: 'Count saved successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save count', error });
  }
}
