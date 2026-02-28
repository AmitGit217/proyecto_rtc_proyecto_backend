import express from 'express';
const UserRoutes = express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from './user.controller.js';
import {upload} from '../../config/flieStorage.js';

UserRoutes.post('/', upload.single('image'), createUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', upload.single('image'), updateUser);
UserRoutes.delete('/:id', deleteUser);
UserRoutes.post('/login', loginUser);

export default UserRoutes;