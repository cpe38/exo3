const auth = require("../middlewares/auth");
const Intervention = require("../models/Intervention");

exports.addIntervention = (req, res, next) => {
  console.log("ADD INTERVENTION", req.body);
  const intervention = new Intervention({
    agentId: req.auth.agentId,
    ...req.body,
  });
  intervention
    .save()
    .then(() => res.status(201).json({ message: "INTERVENTION CREEE" })) // 201 code de suppression
    .catch((err) => res.status(400).json({ err }));
};

exports.getIntervention = (req, res, next) => {
  Intervention.find({ userId: req.auth.userId })
    .then((interventions) => {
      res.status(200).json(interventions);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.getAllIntervention = (req, res, next) => {
  Intervention.find()
    .then((interventions) => {
      res.status(200).json(interventions);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteIntervention = (req, res, next) => {
  Intervention.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "INTERVENTION DELETED" }); // 200 code de succès
    })
    .catch((err) => res.status(400).json({ err }));
};
