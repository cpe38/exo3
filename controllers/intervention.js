const auth = require("../middlewares/auth");
const Intervention = require("../models/Intervention");

exports.addIntervention = (req, res, next) => {
  const interventionObject = JSON.parse(req.body.intervention);

  const intervention = new Intervention({
    ...interventionObject,
    numAgent: req.auth.numAgent,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  intervention
    .save()
    .then(() => res.status(201).json({ success: "INTERVENTION CREEE" })) // 201 code de suppression
    .catch((err) => res.status(400).json({ err }));
};

// exports.addIntervention = (req, res, next) => {
//   const intervention = new Intervention({
//     numAgent: req.auth.numAgent,
//     ...req.body,
//   });
//   intervention
//     .save()
//     .then(() => res.status(201).json({ success: "INTERVENTION CREEE" })) // 201 code de suppression
//     .catch((err) => res.status(400).json({ err }));
// };

exports.getIntervention = (req, res, next) => {
  Intervention.find({ numAgent: req.auth.numAgent })
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
  Intervention.findOne({ _id: req.params.id })
    .then((intervention) => {
      if (intervention.numAgent === req.auth.numAgent) {
        intervention
          .deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ success: "INTERVENTION DELETED" })
          ); // 200 code de succès)
      }
      return res.status(401).json({ message: "MAUVAIS USER" }); // 200 code de succès
    })
    .catch((err) => res.status(400).json({ err }));
};
