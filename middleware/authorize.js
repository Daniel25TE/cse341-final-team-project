module.exports = function(requiredRole) {
  return (req, res, next) => {
    const { role } = req.user;

    if (requiredRole === 'customer' && (role === 'customer' || role === 'admin')) return next();

    if (requiredRole === 'admin' && role === 'admin') return next();

    return res.status(403).json({ error: `You don’t have ${requiredRole} permissions to do this operation` });
  };
};