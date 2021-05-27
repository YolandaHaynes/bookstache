const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const booksController = require("../controllers/books");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, booksController.getPost);

router.post("/createBook", upload.single("file"), booksController.createPost);

router.put("/likePost/:id", booksController.likePost);

router.delete("/deletePost/:id", booksController.deletePost);

module.exports = router;