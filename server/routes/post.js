var express = require("express");
var router = express.Router();

/* import controller method */
const { create } = require("../controllers/post");

router.get("/post", create);

module.exports = router;
