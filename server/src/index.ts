import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';

const app = express();

const PORT_NUMBER = 9000;

const server = new ApolloServer({ schema });

server.applyMiddleware({ app, path: '/api' });

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
