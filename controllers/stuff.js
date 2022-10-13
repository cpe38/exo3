const Thing = require("../models/Thing");
const fs = require("fs");
const worker = require("../workers/worker");
const eventFichier = require("../events/fichier");

// EXO 4
exports.createOneThing = (req, res, next) => {
  // Requête forme-data obligatoire pour de l'upload
  // Donc obligé de parse
  const thingObject = JSON.parse(req.body.thing);

  delete thingObject.userId; // Obligatoire sinon mongo va péter un câble car le front en envoie un random
  delete thingObject._id; // Ô KAZOO

  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => {
      eventFichier.emit("creerFichier", {
        fichier: "logCreation.txt",
        message: `Object ${thing.title} créé`,
      });
      res.status(201).json({ message: "OUI" });
    })
    .catch((err) => res.status(400).json({ err }));

  console.log("THING SAVED");
  // worker.apply(
  //   "C:\\DEVELOPMENT\\Tests\\m2i\\nodeJS-formation\\backend\\workers\\workers\\tache-intensive.js"
  // );
  console.log("CREATE TERMINE");
};
// EXO 1/2/3
// exports.createOneThing = (req, res, next) => {
//   delete req.body._id; // Obligatoire sinon mongo va péter un câble

//   const thing = new Thing({ ...req.body });
//   thing
//     .save()
//     .then(() => res.status(201).json({ message: "OUI" })) // 201 code de suppression
//     .catch((err) => res.status(400).json({ err }));
// };

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
// EXO 4
exports.updateOneThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete thingObject.userId;

  // On vérifie que l'utilisateur connecté soit celui qui possède le thing
  Thing.findById({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ message: "OLALA C'EST PAS A TOI HEIN" });
      } else {
        Thing.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id } // On déconstruit le body et on remplace '_id' avec l'id des params
        )
          .then(() => {
            eventFichier.emit("creerFichier", {
              fichier: "logModifications.txt",
              message: `Object ${thing.title} modifié`,
            });
            res.status(200).json({ message: "UPDATED" });
          })
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(400).json({ err }));
};
// EXO 1/2/3
// exports.updateOneThing = (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.body.id }) // On déconstruit le body et on remplace '_id' avec l'id du body
//     .then(() => {
//       res.status(200).json({ message: "UPDATED" });
//     })
//     .catch((err) => res.status(400).json({ err }));
// };

exports.deleteOneThing = (req, res, next) => {
  // On vérifie que l'utilisateur connecté soit celui qui possède le thing
  Thing.findById({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ message: "OLALA C'EST PAS A TOI HEIN" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1];
        fs.unlink("images/" + filename, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "DELETED" }); // 200 code de succès
            })
            .catch((err) => res.status(400).json({ err }));
        });
      }
    })
    .catch((err) => res.status(400).json({ err }));
};
