import express from 'express';
import {
	createUser,
	verifyEmail,
	logoutUser,
	loginUser,
	forgotPassword,
	resetPassword,
	checkAuth,
} from '../controllers/auth.controllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check_auth', verifyToken, checkAuth);

router.post('/signup', createUser);

router.post('/verify_email', verifyEmail);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/forgot_password', forgotPassword);

router.post('/reset_password/:token', resetPassword);

export default router;
