var express = require("express");
var router = express.Router();

/* import controller method */
const { create, list, read, update, remove } = require("../controllers/post");

router.post("/post", create);
router.get("/posts", list);
router.get("/post/:id", read);
router.put("/post/:id", update);
router.delete("/post/:id", remove);

module.exports = router;
