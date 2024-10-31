import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import generateVerifiationToken from '../utils/generateVerificationToken.js';
import generateTokenAndCookie from '../utils/generateTokenAndCookie.js';
import userModel from '../models/auth.model.js';
import sendVerificationEmail from '../mailtrap/sendVerificationEmail.js';
import sendWelcomeEmail from '../mailtrap/sendWelcomeEmail.js';
import generateResetToken from '../utils/generateResetPassordToken.js';
import sendResetPasswordEmail from '../mailtrap/sendResetPasswordEmail.js';
import sendResetPasswordSuccessEmail from '../mailtrap/sendResetPasswordSuccess.js';

const url = process.env.CLIENT_URL;

async function createUser(req, res) {
	const { email, password, username } = req.body;
	const passwordLengthRequirement = 6;
	try {
		if (!email || !password || !username)
			return res.status(400).json({ message: 'All fields are required' });

		const userExists = await userModel.findOne({ email });

		if (userExists)
			return res.status(400).json({ message: 'User already exists' });

		if (password.length < passwordLengthRequirement)
			return res
				.status(400)
				.json({ message: 'Password must be at least 6 characters' });

		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationToken = generateVerifiationToken();

		const user = await userModel.create({
			email,
			password: hashedPassword,
			username,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
		});

		generateTokenAndCookie(res, user._id);
		await sendVerificationEmail(user.email, verificationToken);
		return res
			.status(201)
			.json({ message: `User ${user.username} created successfully` });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function verifyEmail(req, res) {
	const { verificationToken } = req.body;
	try {
		const user = await userModel.findOne({
			verificationToken,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user)
			return res
				.status(400)
				.json({ message: 'Invalid or expired verification token' });

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.username);
		return res.status(200).json({ message: 'Email verified successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function loginUser(req, res) {
	const { email, password } = req.body;
	try {
		if (!email || !password)
			return res.status(400).json({ message: 'All fields are required' });

		const userExists = await userModel.findOne({ email });

		if (!userExists)
			return res.status(400).json({ message: 'User not found' });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			userExists.password
		);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Password is incorrect' });

		generateTokenAndCookie(res, userExists._id);
		userExists.lastLogin = Date.now();
		await userExists.save();
		return res.status(200).json({ message: 'User Logged In Successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function logoutUser(req, res) {
	res.clearCookie('token');
	return res.status(200).json({ message: 'User Logged Out Successfully' });
}

async function forgotPassword(req, res) {
	const { email } = req.body;
	try {
		const user = await userModel.findOne({ email });

		if (!user) return res.status(400).json({ message: 'User not found' });

		const resetPasswordToken = generateResetToken();
		user.resetPasswordToken = resetPasswordToken;
		user.resetPasswordTokenExpiresAt = Date.now() + 15 * 60 * 1000;

		await user.save();

		await sendResetPasswordEmail(
			user.email,
			`${url}reset_password/${resetPasswordToken}`
		);
		return res
			.status(200)
			.json({ message: 'Reset Password Email Sent Successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function resetPassword(req, res) {
	const { token } = req.params;
	const { password } = req.body;
	try {
		const user = await userModel.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiresAt: { $gt: Date.now() },
		});

		console.log(user);

		if (!user)
			return res
				.status(400)
				.json({ message: 'Invalid or expired reset token' });

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiresAt = undefined;
		await user.save();

		sendResetPasswordSuccessEmail(user.email, user.username);

		return res.status(200).json({ message: 'Password Reset Successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function checkAuth(req, res) {
	try {
		const user = await userModel.findById(req.userId);
		if (!user) return res.status(400).json({ message: error.message });

		res.status(200).json({ message: 'Cookie Valid' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export {
	createUser,
	verifyEmail,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	checkAuth,
};
