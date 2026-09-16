export const requireAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "not logged in" });
  }

  req.user = {
    id: req.session.userId,
    role: req.session.role,
    hotelId: req.session.hotelId,
  };
  next();
};
