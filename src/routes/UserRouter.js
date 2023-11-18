import express from 'express';
const router = express.Router();
import {createUserController, loginUser, updateUserController, deleteUserController, getAllUserController, getDetailsUserController, refreshTokenController} from '../controller/UserController.js'
import { autUserMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
router.post('/sign-up', createUserController);
router.post('/sign-in', loginUser);
router.put('/update-user/:id', updateUserController);
router.delete('/delete-user/:id',authMiddleware, deleteUserController);
router.get('/get-all-users',authMiddleware, getAllUserController);
router.get('/get-details-user/:id',autUserMiddleware, getDetailsUserController);
router.post('/refresh-token', refreshTokenController);


export {router}