const { mutipleMongooseObjects, monoMongooseObjects } = require('../../util/mongoose');
const CommentBook = require('../model/CommentModel');
const Book = require('../model/BookModel');

class CommentBookController {
    // create a new comment
    createComment(req, res, next) {
        Book.findOne({_id: req.body.book})
            .then(book => {
                const newComment = new CommentBook({
                    user: req.user._id,
                    book: req.body.book,
                    title: req.body.title,
                    rating: req.body.rating,
                    like: 0
                });
                newComment.save((err, cmt) => {
                    if (err) {
                        res.status(400).send(err);
                    }
                    else {
                        if (book.comments === undefined) {
                            book.comments = [];
                            book.comments.push(cmt._id);
                            book.save();
                        }
                        else {
                            const listCmt = book.comments;
                            listCmt.push(cmt._id);
                            book.save();
                        }
                        res.status(200).send(monoMongooseObjects(cmt));
                    }
                })
            })
            .catch(next);
    }

    // Delete a comment
    deleteComment(req, res, next) {
        CommentBook.deleteOne({_id: req.body._id})
            .then(cmt => {
                res.send("Successfully deleted!");
            })
            .catch(next);
    }

    // Update a comment
    updateComment(req, res, next) {
        CommentBook.updateOne({_id: req.body._id})
            .then(cmt => {
                const newCmt = new Comment({
                    user: cmt.user,
                    nameBook: cmt.nameBook,
                    title: req.body.title,
                })
                newCmt.save((err, superuser) => {
                    if (err) {
                        res.send({message: err.message});
                    }
                    else {
                        res.send("Comment updated successfully");
                    }
                });
            })
            .catch(next);
    }

    // solve like comment
    solveLikeComment(req, res, next) {
        CommentBook.findOne({_id: req.body._id})
            .then(cmt => {
                cmt.like += 1;
                cmt.save();
                res.status(200).send("Like updated successfully");
            })
            .catch(err => res.status(500).send(err));
    }
    solveDislike(req, res, next) {
        CommentBook.findOne({_id: req.body._id})
            .then(cmt => {
                cmt.like -= 1;
                cmt.save();
                res.status(200).send("Like updated successfully");
            })
            .catch(err => res.status(500).send(err));
    }

    // Get user
    getUser(req, res, next) {
        CommentBook.findOne({_id: req.param('_id')})
            .populate('user')
            .exec((err, cmt) => {
                if (cmt) {
                    res.send({user: {
                        _id: cmt.user._id,
                        username: cmt.user.username,
                        imgDes: cmt.user.imgDes,
                        fullName: cmt.user.fullName,
                        created_at: cmt.user.created_at
                    }});
                }
                else {
                    res.send(err);
                }
            })
    }
}

module.exports = new CommentBookController;