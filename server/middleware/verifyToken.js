import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
	const token = req.cookies.token;
	const JWT_SECRET = process.env.JWT_SECRET;
	if (!token)
		return res
			.status(400)
			.json({ message: 'Token not found : Unauthorized' });
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		if (!decoded) return res.status(400).json({ message: 'Invalid Token' });
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export default verifyToken;
