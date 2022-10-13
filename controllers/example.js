const Thing = require("../models/Thing");
const Intervention = require("../models/Intervention");

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.render("pages/index", {
        things: things,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.getAllInterventions = (req, res, next) => {
  Intervention.find()
    .then((interventions) => {
      res.render("pages/indexI", {
        interventions: interventions,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};
