const Blog = require('../model/BlogModel');
const {mutipleMongooseObjects, monoMongooseObjects} = require("../../util/mongoose");

class BlogController {
    getBlogs(req, res, next) {
        Blog.find({})
            .then(blogs => {
                res.send(mutipleMongooseObjects(blogs))
            })
            .catch(next);
    }

    // Get detail of blog
    getContentBlog(req, res, next) {
        Blog.findById(req.param('_id'))
            .then(blog => {
                if (blog.interact.list.includes(req.user._id)) {
                    res.status(200).send({
                        blog: monoMongooseObjects(blog),
                        stateLike: true
                    })
                }
                else {
                    res.status(200).send({
                        blog: monoMongooseObjects(blog),
                        stateLike: false
                    })
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    }

    // Create a new blog
    createBlog(req, res, next) {
        const newBlog = new Blog({
            author: {
                name: req.body.name,
                imgDes: req.body.imgDes,
                role: req.body.role
            },
            title: req.body.title,
            shortDes: req.body.shortDes,
            content: req.body.content,
            interact: {
                like: 0,
                list: []
            }
        });

        newBlog.save(function (err, blog) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(monoMongooseObjects(blog));
            }
        });
    }

    // Solve like blog
    solveLike(req, res, next) {
        const blogId = req.body._id; 
        const userId = req.user._id; 
      
        Blog.findOne({ _id: blogId })
            .then(blog => {
                if (!blog) {
                    throw new Error('Blog not found');
                }
        
                blog.interact.like += 1;
                blog.interact.list.unshift(userId);
        
                return blog.save();
            })
            .then(savedBlog => {
                res.status(200).send(savedBlog);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err.message);
            });
    }
    // Solve dislike blog
    solveDislike(req, res, next) {
        Blog.findOne({_id: req.body._id})
            .then(blog => {
                if (!blog) {
                    throw new Error('Blog not found');
                }
                blog.interact.like -= 1;
                blog.interact.list = blog.interact.list.filter(item => {
                    item !== req.user._id
                });
                return blog.save();
            })
            .then(savedBlog => {
                res.status(200).send(savedBlog);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err)}
            );
    }
}

module.exports = new BlogController;