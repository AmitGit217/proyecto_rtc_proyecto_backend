const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    if (req.method === 'DELETE' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json("Forbidden")
    }
    if (req.body.role && req.body.role === 'admin') {
      return res.status(403).json("Forbidden")
    }

  }
  next();
};


export default isAdmin;