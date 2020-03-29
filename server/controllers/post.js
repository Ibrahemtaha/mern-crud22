var PostService = require("../services/post.service");

const controllers = {};

var sequelize = require("../models/db");
var Post = require("../models/post");

// check if there're tables
sequelize.sync();

exports.create = async function(req, res) {
  const { title, user, content } = req.body;
  //Validation
  if (!title || !user || !content) {
    return res.status(400).json({
      error: "title and user and content is requred"
    });
  }
  try {
    var post = await PostService.createPost({ title, user, content });
    return res.status(200).json({
      status: 201,
      data: post,
      message: "SuccessFully post created"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// list all posts
// exports.list = async (req, res) => {
//   const posts = await Post.findAll();
//   res.json(posts);
//   console.log(posts);
// };

// exports.list = (req, res) => {
//     Post.findAll({
//         limit: 10,
//         order: [["createdAt", "DESC"]]
//     })
//         .then(posts => {
//             res.json(posts);
//             console.log(posts);
//         })
//         .catch(err => console.log(err));
// };
exports.list = async function(req, res, next) {
  // 201 -- when new object created
  // 404 --- not found
  // 200 --- it's ok
  // 404 -- something bad hapened
  // 500 -- some exceptions happens
  try {
    var posts = await PostService.getPosts();
    return res.status(200).json({
      status: 200,
      data: posts,
      message: "SuccessFully user Retrived"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// one post
exports.read = async (req, res) => {
  const { id } = req.params;

  try {
    var post = await PostService.readPost();
    return res.status(200).json({
      status: 200,
      data: post,
      message: "SuccessFully ONE post called"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
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
