import express from 'express';
import UserController from '../controller/user.controller.js';

const UserRouter = express.Router();

UserRouter.get('/', UserController.allUser)

UserRouter.post('/', UserController.createUser);

export default UserRouter;