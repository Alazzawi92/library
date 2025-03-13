const express = require("express");
const router = express.Router();
const bookController = require("./../Controllers/Controller-R");
const auth = require(".././middlewares/auth")

router.get("/", bookController.pages);
router.get("/books", bookController.findBooks);
router.get("/show-book/:id", bookController.findOneBook);
router.get("/add-book/:id",auth, bookController.addBookView);
router.post("/add-book/:id",auth, bookController.addBook);
router.delete("/book/:ISBN", bookController.deleteBook);
router.put("/change/:ISBN", bookController.putBook);
router.patch("/update/:ISBN", bookController.patchBook);
module.exports = router;
