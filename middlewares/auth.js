const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_SECRET");
    const userId = decodedToken.userId;
    const agentId = decodedToken.agentId;
    req.auth = {
      userId: userId,
      agentId: agentId,
    };

    console.log(req.auth);

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
