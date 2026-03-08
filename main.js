import express from 'express';
import dotEnv from 'dotenv';
dotEnv.config();
import bodyParser from 'body-parser';
import { connectDB } from './config/dbConnect.js';
import UserRoutes from './entities/user/user.route.js';
import PostRoutes from './entities/post/post.route.js';


const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', UserRoutes);
app.use("/api/posts", PostRoutes);



app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((error, req, res) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});