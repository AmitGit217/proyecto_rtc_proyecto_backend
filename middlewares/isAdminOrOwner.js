const isAdminOrOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json("Unauthorized");
  }

  const isAdmin = req.user.role === 'admin';
  const isOwner = req.user._id.toString() === req.params.id;

  if (isAdmin || isOwner) {
    return next();
  }

  return res.status(403).json("Forbidden");
};

export default isAdminOrOwner;