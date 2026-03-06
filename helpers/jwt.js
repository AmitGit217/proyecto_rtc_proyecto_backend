import jwt from 'jsonwebtoken';

const generateToken = (id, email, role) => {
   return jwt.sign({ id, email, role}, process.env.JWT_SECRET, { expiresIn: '1d' , algorithm: 'HS256' });
}

const verifyToken = (token) => {
   return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
}


export { generateToken, verifyToken }