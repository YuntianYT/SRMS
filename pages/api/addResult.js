import { connectToDatabase } from '@/utils';

export default async function handler(req, res) {
  try {
    const { client, collection } = await connectToDatabase('results');
    await collection.insertOne(req.body);
    await client.close();
    res.status(200).json({ description: 'Result added successfully' });
  } catch (error) {
    console.error(`Error with mongodb request: ${error}`);
    res.status(500).json({
      description: 'Failed to add Result',
    });
  }
}
