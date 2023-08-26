// import { createServer } from 'http'
// import express, { Express } from 'express'
// import cors from 'cors'

// import authHandler from './handler/auth.handler'

// const app: Express = express()

// app.use(
//   cors({
//     origin: process.env.allowHost ?? true,
//   })
// )

// app.use(express.json())

// app.use('/api/auth', authHandler)

// export const server = createServer(app)

// export default app

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './util/connectDB';
import authHandler from './handler/auth.handler';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/auth', authHandler)

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
})