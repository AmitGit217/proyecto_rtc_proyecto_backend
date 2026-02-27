import UserRoutes from express.Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from './user.controller.js';

UserRoutes.post('/', createUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', getUserById);
UserRoutes.put('/:id', updateUser);
UserRoutes.delete('/:id', deleteUser);
UserRoutes.post('/login', loginUser);

export default UserRoutes;