import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const app = express();

const PORT_NUMBER = 9000;

const server = new ApolloServer({});

server.applyMiddleware({ app, path: '/api' });

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
