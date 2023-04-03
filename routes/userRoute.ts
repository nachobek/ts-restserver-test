// Node modules.


// Third party modules.
import { Router } from "express";


// Own modules.
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";


// Router development.
const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;