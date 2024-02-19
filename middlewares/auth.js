const jwt = require("ksonwebtoken");

const auth = (req, res, next) => {
  const access_token = req.headers.authorization?.split(" ")[1];
  if (access_token) {
    const decoded = jwt.verfiy(access_token);
    if (decoded) {
      req.body.userID = decoded.userID;
      req.body.author = decoded.author;
      next();
    }
  } else {
    res.status(400).send({ msg: "You are not Authorised.", Error: err });
  }
};

module.exports = { auth };
