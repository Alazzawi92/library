const BookModel = require("./../Schame/Book");
const UserModel = require("./../Schame/User");

exports.pages = async (req, res) => {
  try {
    console.log(req.body);
    
    const userId = req.body.userId;

    const books = await BookModel.find();
    const user = await UserModel.findById(userId); // Maintenant c'est correct

    res.render("home", { books, user });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};

exports.findBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).send({ books });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.findOneBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book) {
      res.status(200).send({ book });
    } else {
      res.status(404).send("Livre non trouvé");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.addBookView = async (req, res) => {  // Ajout de "async"
  try {
    const userId = req.params.id; // Vérifier si l'ID est bien présent
    if (!userId) {
      return res.status(400).send("User ID manquant dans l'URL");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
console.log(user)
    res.render("add-book", { user });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.addBook = async (req, res) => {
  try {
   const userId= req.params.id

const user = await UserModel.findById(userId)
const books = await BookModel.find()
    const newBook = new BookModel(req.body);
    const bookSaved = await newBook.save();
    res.status(201).render("home",{user ,books })
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const ISBN = req.params.ISBN;
    const book = await BookModel.findOneAndDelete({ ISBN: ISBN });
    if (book) {
      res
        .status(200)
        .json({ message: `Livre supprimé avec succès ISBN: ${ISBN}` });
    } else {
      res.status(404).send("Livre non trouvé");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.putBook = async (req, res) => {
  try {
    const ISBN = req.params.ISBN;
    const changeData = await BookModel.findOneAndUpdate(
      { ISBN: ISBN },
      { $set: { title: req.body.title, description: req.body.description } },
      { new: true }
    );
    if (changeData) {
      res
        .status(200)
        .json({ message: "Livre mis à jour avec succès", changeData });
    } else {
      res.status(404).send("Livre non trouvé");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
exports.patchBook = async (req, res) => {
  try {
    const ISBN = req.params.ISBN;
    const updatedBook = await BookModel.findOneAndUpdate(
      { ISBN: ISBN },
      { $set: { title: req.body.title, author: req.body.author } },
      { new: true }
    );
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Livre mis à jour avec succès", updatedBook });
    } else {
      res.status(404).send("Livre non trouvé");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};
