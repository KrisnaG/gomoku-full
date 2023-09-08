/**
 * The file is based on the material from lectures/tutorials by Yihan Lu and Le Kang.
 */

import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'

import connectDB from './util/connectDB';
import authHandler from './handler/auth.handler';
import gameHandler from './handler/game.handler';

dotenv.config();

// connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.allowHost ?? true,
  })
)

app.options('*', cors());

app.use(express.json());

app.use('/auth', authHandler);
app.use('/games', gameHandler);

// only listen to request when DB connection is established
mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
})