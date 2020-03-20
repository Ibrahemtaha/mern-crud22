const controllers = {};

var sequelize = require("../models/db");
var post = require("../models/post");

// check if there're tables
sequelize.sync();

exports.create = function(req, res, next) {
  res.json({ data: "respond with a resource" });
};
