import express from 'express';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/dbConnect.js';
import UserRoutes from './entities/user/user.route.js';


import * as nodeDns from "node:dns/promises"
import PostRoutes from './entities/post/post.route.js';
nodeDns.setServers(["1.1.1.1", "8.8.8.8"]); // Set custom DNS servers, he tenido problemas con el DNS de mi ISP y esto me ha ayudado a resolverlos

dotEnv.config();

const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', UserRoutes);
app.use("/api/posts", PostRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});