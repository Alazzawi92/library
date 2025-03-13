const User = require("../Schame/User");
const bcrypt = require("bcrypt");
const Books = require("../Schame/Book");
const mongoose = require("mongoose");

exports.loginView = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et mot de passe sont requis" });
    }
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }
    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Enregistrer l'utilisateur complet dans la session
    req.session.user = {
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
    };
    console.log("user login");
    console.log(req.session.user);

    // Récupérer la liste des livres
    const books = await Books.find();
    // Rendre la page d'accueil avec les livres
    res.render("home", { books, user });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.registerView = (req, res) => {
  res.render("register");
};
exports.register = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  req.session.userId = newUser._id;
  res.render("profile", { user: newUser });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect("/");
  });
};

exports.findUsers = async (req, res) => {
  const users = await User.find();
  res.render("users", { users });
};

exports.profilePage = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    console.log(user);

    res.render("profile", { user });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/user/users");
};

exports.updateUserView = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("updateUser", { user });
};

exports.putUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/user/show-profile-user/" + req.params.id);
};
