function auth(req, res, next) {
  if (!req.session.info.isLog) {
    return res.status(404).send({
      message: "Auth fail",
    });
  }
  console.log("USER IS LOG");
  next();
}

module.exports = { auth };
