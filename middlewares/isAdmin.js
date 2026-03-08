const isAdmin = (req, res, next) => {
  const isAdmin = req.user?.role === 'admin';

  if (isAdmin) return next();

  if (req.method === 'DELETE') {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json("Forbidden");
    }
    return next();
  }

  if (req.body?.role === 'admin') {
    return res.status(403).json("Forbidden");
  }

  next();
};
export default isAdmin;