import express from 'express';
const UserRoutes = express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from './user.controller.js';
import {upload} from '../../config/fileStorage.js';
import isAuth from '../../middlewares/auth.js';
import isAdmin from '../../middlewares/isAdminOrOwner.js';

UserRoutes.post('/', upload.single('image'), createUser);
UserRoutes.post('/login', loginUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', isAuth, isAdmin , upload.single('image'), updateUser);
UserRoutes.delete('/:id', isAuth, isAdmin, deleteUser);


export default UserRoutes;