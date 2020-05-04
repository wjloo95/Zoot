require('dotenv').config();

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './db';
import { typeDefs, resolvers } from './graphql';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  server.applyMiddleware({ app, path: '/api' });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

mount(express());
