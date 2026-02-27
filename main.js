import express from 'express';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/dbConnect.js';

dotEnv.config();

const app = express();

connectDB();
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});