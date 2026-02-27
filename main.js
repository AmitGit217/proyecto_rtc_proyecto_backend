import express from 'express';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';

dotEnv.config();

const app = express();

mongoose.connect(process.env.DB_URI);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});