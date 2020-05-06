const parse = require('csv-parse');
const transform = require('stream-transform');
const stream = require('stream').Transform;
const fs = require('fs');

const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const extractFields = [
  'Name',
  'Space',
  'Description',
  'Notes',
  'Transit',
  'Access',
  'Interaction',
  'House Rules',
  'Thumbnail Url',
  'Picture Url',
  'XL Picture Url',
  'Street',
  'Neighbourhood',
  'City',
  'State',
  'Zipcode',
  'Market',
  'Property Type',
  'Room Type',
  'Cancellation Policy',
];

const hostFields = [
  'Host Name',
  'Host Since',
  'Host Location',
  'Host About',
  'Host Thumbnail Url',
];

const numExtractFields = [
  'Latitude',
  'Longitude',
  'Accommodates',
  'Bathrooms',
  'Bedrooms',
  'Price',
  'Guests Included',
  'Extra People',
  'Minimum Nights',
  'Maximum Nights',
  'Number of Reviews',
  'Review Scores Rating',
];

const extractFieldIndex = [
  4,
  6,
  7,
  10,
  11,
  12,
  13,
  14,
  15,
  17,
  18,
  34,
  35,
  38,
  39,
  40,
  41,
  47,
  48,
  84,
];

const hostFieldsIndex = [21, 22, 23, 24, 28];

const numExtractFieldsIndex = [45, 46, 49, 50, 51, 56, 61, 62, 63, 64, 72, 75];

const url = `mongodb+srv://wjloo95:xdartDKxHHQzKyNn@cluster0-rdi5y.mongodb.net/test?retryWrites=true&w=majority`;
const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('test');
  const collections = {
    listings: db.collection('listings'),
    users: db.collection('users'),
  };

  return collections;
};

const transformData = async (data) => {
  // const finalListingData = {};
  // const hostData = {};
  // const hostID = data['Host ID'];

  // hostFields.forEach((field) => {
  //   if (field === 'Host About') {
  //     hostData[field] = data[field].split('\r\n').join(' ');
  //   } else {
  //     hostData[field] = data[field];
  //   }
  // });

  // extractFields.forEach((field) => {
  //   finalListingData[field] = data[field];
  // });

  // numExtractFields.forEach(
  //   (field) => (finalListingData[field] = Number(data[field]))
  // );

  // const newListing = await db.listings.insertOne(finalListingData);
  // const newListingID = newListing.ops[0]._id;
  // await db.users.updateOne(
  //   { hostID },
  //   { $set: hostData, $push: { listings: newListingID } },
  //   { upsert: true }
  // );
  console.log(data);
  return data;
};

const streamData = async () => {
  const db = await connectDatabase();

  // await db.listings.drop();
  // await db.users.drop();

  const test = fs.createReadStream('./airbnb-input/airbnb-listings.csv').pipe(
    parse({
      delimiter: ';',
      columns: true,
      cast: (value, { header, index }) => {
        if (numExtractFieldsIndex.includes(index)) {
          return header ? value : Number(value);
        } else if (
          hostFieldsIndex.includes(index) ||
          extractFieldIndex.includes(index)
        ) {
          return value;
        } else {
          return undefined;
        }
      },
    })
  );

  const parser = parse({ delimiter: ';', columns: true });

  test.on('data', (chunk) => {
    console.log(chunk);
  });
  // .pipe(transform(transformData));

  // fs.createReadStream('./airbnb-input/airbnb-listings.csv')
  //   .pipe(parse({ delimiter: ';', columns: true }))
  //   .on('data', (data) => {
  //       const finalListingData = {};
  //       const hostData = {};
  //       const hostID = data['Host ID'];

  //       hostFields.forEach((field) => {
  //         if (field === 'Host About') {
  //           hostData[field] = data[field].split('\r\n').join(' ');
  //         } else {
  //           hostData[field] = data[field];
  //         }
  //       });

  //       extractFields.forEach((field) => {
  //         finalListingData[field] = data[field];
  //       });

  //       numExtractFields.forEach(
  //         (field) => (finalListingData[field] = Number(data[field]))
  //       );

  //       const newListing = await db.listings.insertOne(finalListingData);
  //       const newListingID = newListing.ops[0]._id;
  //       await db.users.updateOne(
  //         { hostID },
  //         { $set: hostData, $push: { listings: newListingID } },
  //         { upsert: true }
  //       );
  //       console.log(data);
  //   })
  //   .on('end', () => console.log('Completed ETL'));
};

streamData();
