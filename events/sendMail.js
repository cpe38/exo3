const event = require("events");

let evenement = new event.EventEmitter();

evenement.on("sendMail", (params) => {
  console.log("EMAIL ENVOYE A : " + params.email);
});

module.exports = evenement;
