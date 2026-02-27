import UserRoutes from express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser } from './user.controller.js';

UserRoutes.post('/', createUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', updateUser);
UserRoutes.delete('/:id', deleteUser);

export default UserRoutes;