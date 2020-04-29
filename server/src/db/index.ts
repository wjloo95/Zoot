import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.USER}:${process.env.USER_PWD}@${process.env.CLUSTER}.mongodb.net`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');
  const collections = { listings: db.collection('test_listings') };

  return collections;
};
