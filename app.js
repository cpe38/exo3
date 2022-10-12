const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const agentRoutes = require("./routes/agent");
const interventionRoutes = require("./routes/intervention");

const app = express();
app.use(express.json()); // Equivalent de bodyparser

mongoose
  .connect(
    "mongodb+srv://user:password01@cluster0.w8ndqna.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("OK"))
  .catch(() => console.log("K.O !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autorisation de TOUTES les origines
  res.setHeader(
    "Access-Control-Allow-Headers", // Ajout des headers obligatoires de base
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // Content-Type et Authorization sont rajoutés
  );
  res.setHeader(
    "Access-Control-Allow-Methods", // Méthodes autorisées sur l'API
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/intervention", interventionRoutes);

module.exports = app;
