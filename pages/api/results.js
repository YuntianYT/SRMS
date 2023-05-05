import { connectToDatabase } from '@/utils';

export default async function handler(req, res) {
  try {
    const { client, collection } = await connectToDatabase('results');
    const data = await collection.find({}).toArray();
    res.status(200).json({ data });
    await client.close();
  } catch (error) {
    console.error(`Error with mongodb request: ${error}`);
    res.status(500).json({ message: 'Error with mongodb request' });
  }
}
