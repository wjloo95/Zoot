const parse = require('csv-parse');
const fs = require('fs');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;

const { MongoClient } = require('mongodb');

const dbURL =
  'mongodb+srv://wjloo95:xdartDKxHHQzKyNn@cluster0-rdi5y.mongodb.net/test?retryWrites=true&w=majority';

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
  'Host ID',
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

const hostFieldsIndex = [19, 21, 22, 23, 24, 28];

const numExtractFieldsIndex = [45, 46, 49, 50, 51, 56, 61, 62, 63, 64, 72, 75];

const connectDatabase = async () => {
  const client = await MongoClient.connect(dbURL, {
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

const streamData = async () => {
  const db = await connectDatabase();
  
  const test = fs
    .createReadStream('./airbnb-input/airbnb-listings.csv')
    .pipe(
      parse({
        delimiter: ';',
        columns: true,
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
        .pipe(streamToMongoDB({ dbURL, collection: 'test' }));
        
        // test.on('data', async (data) => {
          //   const finalListingData = {};
          //   const hostData = {};
          
          //   for (let [key, value] of Object.entries(data)) {
            //     if (hostFields.includes(key)) {
              //       hostData[key] = value;
              //     } else {
                //       finalListingData[key] = value;
                //     }
                //   }
                //   const newListing = await db.listings.insertOne(finalListingData);
                //   const newListingID = newListing.ops[0]._id;
                //   await db.users.updateOne(
                  //     { 'Host ID': hostData['Host ID'] },
                  //     { $setOnInsert: hostData, $push: { listings: newListingID } },
                  //     { upsert: true }
                  //   );
                  // });
                };
                
                const createUsers = () => {
                  const db = await connectDatabase();
                  
                  const stream = db.test.find().stream({transform: async(data) => {
                    const hostData = {
                      'Host ID': data['Host ID'],
  'Host Name': data['Host Name'],
  'Host Since': data['Host Since'],
  'Host Location': data['Host Location'],
  'Host About': data['Host About'],
  'Host Thumbnail Url': data['Host Thumbnail Url'],
                    }
                      await db.users.updateOne(
                          { 'Host ID': data['Host ID'] },
                          { $setOnInsert: hostData, $push: { listings: newListingID } },
                          { upsert: true }
                        );

                        const newData = {...data}
                        
                        delete newData['Host ID'],
  delete newData['Host Name'],
  delete newData['Host Since'],
  delete newData['Host Location'],
  delete newData['Host About'],
  delete newData['Host Thumbnail Url']

  return newData
                    
                  }})
                  
                }
                
                streamData();
                