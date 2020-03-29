var Post = require("../models/post");


exports.getPosts = async function (query) {
    try {
        var posts = await Post.findAll(query);
        return posts;
    } catch (e) {
        throw Error('Error while getting Posts')
    }
};