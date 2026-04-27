import express from 'express';
import { google, signin, signup, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { signupValidation, signinValidation, emailValidation, passwordResetValidation, validate } from '../utils/validation.js';

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/signin', signinValidation, validate, signin);
router.post('/google', google);
router.post('/forgot-password', emailValidation, validate, forgotPassword);
router.post('/reset-password/:token', passwordResetValidation, validate, resetPassword);

export default router;