const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const override = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
require("dotenv").config();

// Import des routes et utils
const BookRouter = require("./routes/Book");
const userRouter = require("./routes/user");
const connectDB = require("./database/connect");

// Définition du port
const port = process.env.PORT || 3005;

// Connexion à la base de données
connectDB();

// Configuration de Multer pour le traitement des fichiers
const upload = multer();

// Configuration du moteur de template
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any()); // Gère les fichiers envoyés par les formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(override("_method"));

// 🔹 Configuration de la session avec stockage MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "votre_secret_de_session",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/yourDB", 
      collectionName: "sessions" 
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
      secure: false, // ⚠️ À mettre sur true en production si HTTPS
      httpOnly: true, // Protège contre les attaques XSS
    },
  })
);

// 🔹 Middleware pour stocker l'utilisateur connecté dans `res.locals`
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  console.log("Session Actuelle :", req.session);
  next();
});

// Déclaration des routes
app.use(BookRouter);
app.use(userRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
