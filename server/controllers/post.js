const controllers = {};

var sequelize = require("../models/db");
var Post = require("../models/post");

// check if there're tables
sequelize.sync();

exports.create = function(req, res) {
  //console.log(req.body);
  //res.json({ hello: "hello" });

  const { title, user, content } = req.body;

  //Validation
  if (!title || !user || !content) {
    return res.status(400).json({
      error: "title and content is requred"
    });
  }
  res.json({
    message: "See your server console"
  });

  //Create post
  Post.create({ title, user, content }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Duplicate post, Try another title" });
    }
    res.json(post);
  });
};
