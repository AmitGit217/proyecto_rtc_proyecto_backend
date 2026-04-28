const isAdminOrOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json("Unauthorized");
  }

  const isAdmin = req.user.role === 'admin';
  const isOwner = req.user._id.toString() === req.params.id;

  if (isAdmin || isOwner) {
    if (isOwner && req.body.role && req.body.role !== 'user') {
      return res.status(403).json("Forbidden");
    }
    return next();
  }

  return res.status(403).json("Forbidden");
};

export default isAdminOrOwner;