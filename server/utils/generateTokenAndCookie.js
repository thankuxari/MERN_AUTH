import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
function generateTokenAndCookie(res, userId) {
	const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000,
	});

	return token;
}

export default generateTokenAndCookie;
