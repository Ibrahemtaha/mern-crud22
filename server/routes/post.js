var express = require("express");
var router = express.Router();

/* import controller method */
const { create, list, read, update, remove } = require("../controllers/post");

router.post("/post", create);
//get all posts
router.get("/posts", list);
// Get one post
router.get("/post/:id", read);
// Update
router.put("/post/:id", update);
// Delete
router.delete("/post/:id", remove);

module.exports = router;
