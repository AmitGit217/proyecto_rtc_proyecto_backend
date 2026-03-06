import express from 'express';
const UserRoutes = express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from './user.controller.js';
import {upload} from '../../config/flieStorage.js';
import isAuth from '../../middlewares/auth.js';
import isAdmin from '../../middlewares/isAdmin.js';

UserRoutes.post('/', upload.single('image'), createUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', isAuth, isAdmin , upload.single('image'), updateUser);
UserRoutes.delete('/:id', isAuth, isAdmin, deleteUser);
UserRoutes.post('/login', loginUser);

export default UserRoutes;