const event = require("events");
const fs = require("fs");

let evenement = new event.EventEmitter();

evenement.on("creerFichier", (params) => {
  fs.writeFile(`fichiers/${params.fichier}`, params.message, (err) => {
    if (err) {
      throw err;
    }
  });
});

evenement.on("appendFichier", (params) => {
  fs.appendFil(`fichiers/${params.fichier}`, params.message + "\n", (err) => {
    if (err) {
      throw err;
    }
  });
});

module.exports = evenement;
