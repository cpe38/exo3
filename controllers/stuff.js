const Thing = require("../models/Thing");

exports.createOneThing = (req, res, next) => {
  delete req.body._id; // Obligatoire sinon mongo va péter un câble
  const thing = new Thing({ ...req.body });
  thing
    .save()
    .then(() => res.status(201).json({ message: "OUI" })) // 201 code de suppression
    .catch((err) => res.status(400).json({ err }));
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findById(req.params.id)
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.updateOneThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.body.id }) // On déconstruit le body et on remplace '_id' avec l'id du body
    .then(() => {
      res.status(200).json({ message: "UPDATED" });
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteOneThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.body.id })
    .then(() => {
      res.status(200).json({ message: "DELETED" }); // 200 code de succès
    })
    .catch((err) => res.status(400).json({ err }));
};
