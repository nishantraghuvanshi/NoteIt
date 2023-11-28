import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function authenticateUser(req, res, next) {
  const token = req.cookies.value;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
}

export default authenticateUser;