const parse = require('csv-parse');
const fs = require('fs');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;

const { MongoClient } = require('mongodb');

const dbURL =
  'mongodb+srv://wjloo95:xdartDKxHHQzKyNn@cluster0-rdi5y.mongodb.net/zoot?retryWrites=true&w=majority';

const extractFieldIndex = [4, 7, 10, 14, 17, 18, 34, 38, 39, 44, 47, 48];

const hostFieldsIndex = [19, 21, 22, 23, 24, 28];

const numExtractFieldsIndex = [45, 46, 49, 50, 51, 56, 63, 72, 75];

const connectDatabase = async () => {
  const client = await MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('zoot');
  const collections = {
    listings: db.collection('listings'),
    premium_listings: db.collection('premium_listings'),
    users: db.collection('users'),
    premium_users: db.collection('premium_users'),
  };

  return collections;
};

const streamData = async () => {
  // const db = await connectDatabase();

  fs.createReadStream('../airbnb-input/airbnb-listings.csv')
    .pipe(
      parse({
        delimiter: ';',
        columns: true,
        on_record: (value, { records }) => {
          // return value['Number of Reviews'] >= 100 || value['Price'] >= 500
          //   ? { ...value, bookings: [], bookingsIndex: {} }
          //   : null;
          return records < 250000 &&
            (value['Number of Reviews'] >= 10 || value['Price'] >= 200)
            ? value
            : null;
        },
        cast: (value, { header, index, column }) => {
          if (numExtractFieldsIndex.includes(index)) {
            return header ? value : Number(value);
          } else if (
            hostFieldsIndex.includes(index) ||
            extractFieldIndex.includes(index)
          ) {
            return header
              ? value
              : column === 'Host About'
              ? value.split('\r\n').join(' ')
              : value;
          } else {
            return undefined;
          }
        },
      })
    )
    .pipe(
      streamToMongoDB({
        dbURL,
        collection: 'listings',
      })
    );
};

const createUsers = async () => {
  const db = await connectDatabase();

  await db.listings.find().forEach(async (data) => {
    const newListingID = data._id;

    const hostData = {
      id: data['Host ID'],
      name: data['Host Name'],
      since: data['Host Since'],
      location: data['Host Location'],
      about: data['Host About'],
      avatar: data['Host Thumbnail Url'],
      bookings: [],
      favoriteListings: [],
    };

    const newUser = await db.users.findOneAndUpdate(
      { id: data['Host ID'] },
      { $setOnInsert: hostData, $push: { listings: newListingID } },
      { upsert: true, returnOriginal: false }
    );

    await db.listings.updateOne({ _id: newListingID }, [
      {
        $set: { host: `${newUser.value._id}` },
      },
    ]);
  });

  console.log('Done!');
  return;
};

const fixNames = async () => {
  const db = await connectDatabase();

  await db.listings.updateMany(
    {},
    {
      $rename: {
        Name: 'name',
        Description: 'description',
        Notes: 'notes',
        'House Rules': 'rules',
        'Picture Url': 'image',
        'XL Picture Url': 'largeImage',
        Street: 'street',
        City: 'city',
        State: 'state',
        Country: 'country',
        Latitude: 'latitude',
        Longitude: 'longitude',
        'Property Type': 'property',
        'Room Type': 'room',
        Accommodates: 'numOfGuests',
        Bathrooms: 'bathrooms',
        Bedrooms: 'bedrooms',
        Price: 'price',
        'Minimum Nights': 'minimum',
        'Number of Reviews': 'reviews',
        'Review Scores Rating': 'rating',
      },
      $unset: {
        'Host ID': '',
        'Host Name': '',
        'Host Since': '',
        'Host Location': '',
        'Host About': '',
        'Host Thumbnail Url': '',
      },
    }
  );

  await db.users.updateMany({}, { $unset: { id: '' } });

  console.log('Done!');
  return;
};

// streamData();
// createUsers();
fixNames();
