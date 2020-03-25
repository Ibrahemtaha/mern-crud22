var express = require("express");
var router = express.Router();

/* import controller method */
const { create, list, read } = require("../controllers/post");

router.post("/post", create);
//get all posts
router.get("/posts", list);
// Get one post
router.get("/post/:slug", read);

module.exports = router;
