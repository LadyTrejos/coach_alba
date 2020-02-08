function isAuthenticated(req, res, next) {
  if (req.user) if (req.user.authenticated) return next();

  res.status(403).send({ message: "Unauthorized." });
}

module.exports = isAuthenticated;
