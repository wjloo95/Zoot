import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';
require('dotenv').config();

const url = `mongodb+srv://${process.env.USER}:${process.env.USER_PWD}@${process.env.CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');
  const collections = { listings: db.collection('test_listings') };

  return collections;
};
