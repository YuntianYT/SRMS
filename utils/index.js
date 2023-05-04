export const connectToDatabase = async (collectionName) => {
  const { MongoClient } = require('mongodb');
  const connectionString =
    'mongodb+srv://admin:H1iQFsiZdWNz095b@projects.xpyyyr0.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(connectionString);
  const db = client.db('srms');
  const collection = db.collection(collectionName);

  return { client, collection };
};
