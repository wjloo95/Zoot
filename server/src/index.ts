import express from 'express';

import { listings } from './mocklistings';

const app = express();

app.use(express.json());

app.get('/listings', (req, res) => {
  res.send(listings);
});

app.delete('/delete-listing', (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      const updatedListings = listings.splice(i, 1)[0];
      return res.send(updatedListings);
    }
  }
  return res.send('Failed to delete listing');
});

const PORT_NUMBER = process.env.PORT || 9000;

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
