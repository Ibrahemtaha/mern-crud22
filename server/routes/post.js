var express = require("express");
var router = express.Router();

/* import controller method */
const { create, list, read, update, remove } = require("../controllers/post");

router.post("/post", create);
//get all posts
router.get("/posts", list);
// Get one post
router.get("/post/:slug", read);
// Update
router.put("/post/:slug", update);
// Delete
router.delete("/post/:slug", remove);
module.exports = router;
