import express from 'express';
const PostRoutes = express.Router();
import isAuth from '../../middlewares/auth.js';
import { createPost, deletePost, getPostById, getPosts, updatePost } from './post.controller.js';

PostRoutes.post('/', isAuth, createPost);
PostRoutes.get('/', getPosts);
PostRoutes.get('/:id', getPostById);
PostRoutes.put('/:id', isAuth, updatePost);
PostRoutes.delete('/:id', isAuth, deletePost);

export default PostRoutes;