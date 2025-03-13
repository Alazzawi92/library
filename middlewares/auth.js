module.exports = (req, res, next) => {
  console.log(req.session.user);
  console.log(req.session.user)
  
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.status(403).send("Vous n'êtes pas autorisé à accéder à cette page");
  }
};