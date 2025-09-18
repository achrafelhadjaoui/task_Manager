import express from 'express';
import userSignupController from '../controller/user/userSignUp.js';
import userSigninController from '../controller/user/userSignin.js';
import authToken from '../midlleware/auth_Token.js';

const router = express.Router();


router.post('/signup', userSignupController);
router.post('/signin', userSigninController);


export default router;