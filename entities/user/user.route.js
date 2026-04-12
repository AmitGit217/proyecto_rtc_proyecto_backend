import express from 'express';
const UserRoutes = express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from './user.controller.js';
import {upload} from '../../config/fileStorage.js';
import isAuth from '../../middlewares/auth.js';
import isAdminOrOwner from '../../middlewares/isAdminOrOwner.js';

UserRoutes.post('/', upload.single('image'), createUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', isAuth, isAdminOrOwner , upload.single('image'), updateUser);
UserRoutes.delete('/:id', isAuth, isAdminOrOwner, deleteUser);
UserRoutes.post('/login', loginUser);

export default UserRoutes;