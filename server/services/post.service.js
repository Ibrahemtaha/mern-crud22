var Post = require("../models/post");

exports.getPosts = async function() {
  var query = {
    limit: 10,
    order: [["createdAt", "DESC"]]
  };
  try {
    var posts = await Post.findAll(query);

    return posts;
  } catch (e) {
    throw Error("Error while getting Posts");
  }
};

exports.createPost = async function(entity) {
  try {
    var result = await Post.create(entity);
    return result;
  } catch {
    if (err) {
      throw Error("Error when creating post");
    }
  }
};

exports.readPost = async function(id) {
  var query = {
    where: {
      post_id: id
    }
  };
  try {
    var post = await Post.findOne(query);
    return post;
  } catch {
    if (err) {
      throw Error("Error when creating post");
    }
  }
};
