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
    console.log(123);
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Duplicate post, Try another title" });
    }
    res.json(post);
  });
};

// list all posts
// exports.list = async (req, res) => {
//   const posts = await Post.findAll();
//   res.json(posts);
//   console.log(posts);
// };

exports.list = (req, res) => {
  Post.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]]
  })
    .then(posts => {
      res.json(posts);
      console.log(posts);
    })
    .catch(err => console.log(err));
};

// one post
exports.read = (req, res) => {
  const { id } = req.params;

  Post.findOne({
    where: {
      post_id: id
    }
  })
    .then(post => {
      res.json(post);
      console.log(post);
    })
    .catch(err => console.log(err));
};

// Update
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, user, content } = req.body;

  Post.update(
    { title, user, content },
    {
      where: {
        post_id: id
      },
      returning: true
    }
  )
    .then(post => {
      res.json(post);
      console.log(post);
    })
    .catch(err => console.log(err));
};

// Delete \ Remove
exports.remove = (req, res) => {
  const { id } = req.params;

  Post.destroy({
    where: {
      post_id: id
    }
  })
    .then(post => {
      res.json(post);
      console.log(post);
    })
    .catch(err => console.log(err));
};
