const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_SECRET");
    const userId = decodedToken.userId;
    const agentId = decodedToken.agentId;
    const numAgent = decodedToken.numAgent;
    req.auth = {
      userId: userId,
      agentId: agentId,
      numAgent: numAgent,
    };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
