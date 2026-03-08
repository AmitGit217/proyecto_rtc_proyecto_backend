import User from '../entities/user/user.model.js'
import { verifyToken } from '../helpers/jwt.js';

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json("Unauthorized")
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json("Unauthorized")
    req.user = user
    next() 
  } catch (error) {
    return res.status(401).json("Unauthorized")
  }
}

export default isAuth;