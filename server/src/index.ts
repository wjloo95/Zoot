import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('hello world'));

const PORT_NUMBER = process.env.PORT || 9000;

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
