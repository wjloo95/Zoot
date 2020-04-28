import express from 'express';

import { listings } from './mocklistings';

const app = express();

app.get('/listings', (req, res) => {
  res.send(listings);
});

const PORT_NUMBER = process.env.PORT || 9000;

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
