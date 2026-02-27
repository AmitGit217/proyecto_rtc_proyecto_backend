import express from 'express';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/dbConnect.js';
import UserRoutes from './entities/user/user.route.js';

dotEnv.config();

const app = express();
app.use('/api/users', UserRoutes);
connectDB();
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});