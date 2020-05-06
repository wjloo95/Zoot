const parse = require('csv-parse');
const fs = require('fs');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;

const { MongoClient } = require('mongodb');

const dbURL =
  'mongodb+srv://wjloo95:xdartDKxHHQzKyNn@cluster0-rdi5y.mongodb.net/airbnb?retryWrites=true&w=majority';

const extractFieldIndex = [4, 7, 10, 14, 17, 34, 38, 39, 44, 47, 48];

const hostFieldsIndex = [19, 21, 22, 23, 24, 28];

const numExtractFieldsIndex = [45, 46, 49, 50, 51, 56, 63, 72, 75];

const connectDatabase = async () => {
  const client = await MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('airbnb');
  const collections = {
    listings: db.collection('listings'),
    premium_listings: db.collection('premium_listings'),
    users: db.collection('users'),
    premium_users: db.collection('premium_users'),
  };

  return collections;
};

const streamData = async () => {
  const db = await connectDatabase();

  const test = fs
    .createReadStream('../airbnb-input/airbnb-listings.csv')
    .pipe(
      parse({
        delimiter: ';',
        columns: true,
        on_record: (value, context) => {
          // if (
          //   !['strict', 'flexible', 'moderate'].includes(
          //     value['Cancellation Policy']
          //   )
          // ) {
          //   return null;
          // } else if (
          //   ![
          //     'Apartment',
          //     'House',
          //     'Bed & Breakfast',
          //     'Condominium',
          //     'Loft',
          //     'Townhouse',
          //     'Villa',
          //     'Bungalow',
          //     'Boat',
          //   ].includes(value['Property Type'])
          // ) {
          //   return null;
          // } else if (value['Number of Reviews'] < 100) {
          //   return null;
          // }
          // return value;
          // Premium Listings
          // return value['Price'] >= 500 ? value : null;
          // Listings
          // return value['Number of Reviews'] >= 100 ? value : null;
          return value['Number of Reviews'] >= 100 || value['Price'] >= 500
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
    .pipe(streamToMongoDB({ dbURL, collection: 'listings' }));
};

const createUsers = async () => {
  const db = await connectDatabase();

  // await db.premium_listings.find().forEach(async (data) => {
  await db.listings.find().forEach(async (data) => {
    const newListingID = data._id;
    const hostData = {
      'Host ID': data['Host ID'],
      'Host Name': data['Host Name'],
      'Host Since': data['Host Since'],
      'Host Location': data['Host Location'],
      'Host About': data['Host About'],
      'Host Thumbnail Url': data['Host Thumbnail Url'],
    };
    // const newUser = await db.premium_users.updateOne(
    const newUser = await db.users.findOneAndUpdate(
      { 'Host ID': data['Host ID'] },
      { $setOnInsert: hostData, $push: { listings: newListingID } },
      { upsert: true, returnOriginal: false }
    );

    // await db.premium_listings.updateMany({}, [
    await db.listings.updateOne({ _id: newListingID }, [
      {
        $unset: [
          'Host ID',
          'Host Name',
          'Host Since',
          'Host Location',
          'Host About',
          'Host Thumbnail Url',
        ],
      },
      { $set: { host: newUser.value._id } },
    ]);
  });

  console.log('Done!');
  return;
};

const fixNames = async () => {
  const db = await connectDatabase();

  // await db.premium_listings.updateMany(
  await db.listings.updateMany(
    {},
    {
      $rename: {
        Name: 'name',
        Description: 'description',
        Notes: 'notes',
        'House Rules': 'rules',
        'Picture Url': 'image',
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
      $unset: { 'Cancellation Policy': '' },
    }
  );

  // await db.premium_users.updateMany(
  await db.users.updateMany(
    {},
    {
      $rename: {
        'Host ID': 'id',
        'Host Name': 'name',
        'Host Since': 'since',
        'Host Location': 'location',
        'Host About': 'about',
        'Host Thumbnail Url': 'avatar',
      },
    }
  );
  console.log('Done!');
  return;
};

// streamData().then(() => {
//   createUsers().then(() => {
//     });
//   });
// });

// streamData();
// createUsers();
fixNames();
