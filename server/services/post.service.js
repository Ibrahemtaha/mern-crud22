var Post = require("../models/post");

exports.getPosts = async function () {
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

exports.createPost = async function (entity) {
    try {
        var result = await Post.create(entity);
        return result;
    } catch (error) {
        if (error) {
            throw Error("Error when creating post");
        }
    }
};

exports.readPost = async function (id) {
    var query = {
        where: {
            post_id: id
        }
    };

    try {
        var post = await Post.findOne({query});
        console.log(post);
        return post;
    } catch (err) {
        if (err) {
            throw Error("Error while fetching post");
        }
    }
};

exports.abc = async (entity, id) => {

};


// Syncronize code block;
// Promise  --- ??
// const a= b;
// cosnt db=c;


// coall to database-> and lot's calculation ->
// pormise is something -> that makes a promise to return something.... ok / bad -->
// Node js is single threaded..__>

// Asycnrous code->
exports.updatePost = async function (entity, id) {
    try {
        return await Post.update(
            entity,
            {
                where: {
                    post_id: id
                },
                returning: true
            }
        );
    } catch (err) {
        if (err) {
            throw Error("Error while updating the post");
        }
    }
};