const express = require("express")

const postController = require("../contollers/postContoller")

const router = express.Router();

const protect = require("../middleware/authMiddleware");

//localhost:3000/
router.route("/").get(protect, postController.getAllPosts).post(protect, postController.createPost);

//localhost:3000/:id
router.route("/:id").get(protect, postController.getOnePost).delete(protect, postController.deletePost).patch(protect, postController.updatePost);

module.exports = router;