import express from 'express';
import userSignupController from '../controller/user/userSignUp.js';
import userSigninController from '../controller/user/userSignin.js';
import authToken from '../midlleware/auth_Token.js';
import userDetailsController from '../controller/user/userDetails.js';
import createTaskController from '../controller/task/createTaskController.js';
import getTasksController from '../controller/task/getTasksController.js';
import updateTaskController from '../controller/task/updateTaskController.js';
import deleteTaskController from '../controller/task/deleteTaskController.js';
import userLogoutController from '../controller/user/UserLogout.js';

const router = express.Router();


router.post('/signup', userSignupController);
router.post('/signin', userSigninController);
router.get('/user-details', authToken, userDetailsController)
router.post('/logout', authToken, userLogoutController);

// task routes
router.post('/create-task', authToken, createTaskController);
router.get('/get-tasks', authToken, getTasksController);
router.put('/update-task/:id', authToken, updateTaskController);
router.delete('/delete-task/:id', authToken, deleteTaskController);



export default router;