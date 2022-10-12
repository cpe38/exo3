const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAgent = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const agent = new Agent({
        grade: req.body.grade,
        numAgent: req.body.numAgent,
        password: hash,
      });
      console.log(agent._id);

      agent
        .save()
        .then(() => {
          res.status(201).json({
            success: agent._id,
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginAgent = (req, res, next) => {
  Agent.findOne({ numAgent: req.body.numAgent, grade: req.body.grade })
    .then((agent) => {
      if (!agent) {
        return res.status(401).json({ message: "Paire num/grade incorect 1" });
      }
      bcrypt
        .compare(req.body.password, agent.password)
        .then((passOK) => {
          if (!passOK) {
            return res
              .status(401)
              .json({ message: "Paire num/grade incorect 2" });
          }
          res.status(200).json({
            agentId: agent._id,
            token: jwt.sign({ agentId: agent._id }, "RANDOM_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.updateAgent = (req, res, next) => {
  Agent.findOne({ _id: req.auth.agentId })
    .then((agent) => {
      if (!agent) {
        return res.status(401).json({ message: "MAUVAIS AGENT" });
      }
      Agent.updateOne(
        { _id: req.auth.agentId },
        { grade: req.body.grade }
      ).then(() => {
        res.status(200).json({ success: "UPDATED AGENT" });
      });
    })
    .catch((error) => res.status(400).json({ error }));
};
