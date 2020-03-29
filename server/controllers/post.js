var PostService = require("../services/post.service");

const controllers = {};

var sequelize = require("../models/db");
var Post = require("../models/post");

// check if there're tables
sequelize.sync();

exports.create = function (req, res) {
    //console.log(req.body);
    //res.json({ hello: "hello" });
    const {title, user, content} = req.body;
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
    Post.create({title, user, content}, (err, post) => {
        console.log(123);
        if (err) {
            console.log(err);
            res.status(400).json({error: "Duplicate post, Try another title"});
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
exports.list = async function (req, res, next) {
    var query = {
        limit: 10,
        order: [["createdAt", "DESC"]]
    };
    // 201 -- when new object created
    // 404 --- not found
    // 200 --- it's ok
    // 404 -- something bad hapened
    // 500 -- some exceptions happens
    try {
        var posts = await PostService.getPosts(query);
        return res.status(200).json({status: 200, data: posts, message: "SuccessFully user Retrived"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};


// one post
exports.read = (req, res) => {
    const {id} = req.params;

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
    const {id} = req.params;
    const {title, user, content} = req.body;

    Post.update(
        {title, user, content},
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
    const {id} = req.params;

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
