import { MongoClient } from 'mongodb';
import { Database, User, Listing, Booking } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');
  const collections = {
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
    premium_listings: db.collection<Listing>('premium_listings'),
    premium_users: db.collection<User>('premium_users'),
    bookings: db.collection<Booking>('bookings'),
  };

  return collections;
};
