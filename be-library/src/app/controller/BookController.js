const Book = require('../model/BookModel');
const {mutipleMongooseObjects, monoMongooseObjects} = require("../../util/mongoose");

class BookController {

    // Get all books in library
    getBooks(req, res, next) {
        Book.find({})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    };

    getBooksByType(req, res, next) {
        Book.find({type: req.param('type')})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }

    getBookById(req, res, next) {
        Book.findOne({_id: req.param('_id')})
            .then(book => {
                res.send(monoMongooseObjects(book))
            })
            .catch(next);
    }

    // Find book by name "/books/search"
    findBook(req, res, next) { 
        Book.findOne({name: req.param('name')}, function(err, book) {
            if (book) {
                res.send(monoMongooseObjects(book));
            }
            else if (!book) {
                Book.find({author: req.param('name')})
                    .then(books => res.send(mutipleMongooseObjects(books)))
                    .catch(err=> res.send(err))
            }
            else {
                res.send(err);
            }
        })
    }

    // Get book Domestic
    getBookDomestic(req, res, next) {
        Book.find({region: "domestic"})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }

    // Get book foreign
    getBookForeign(req, res, next) {
        Book.find({region: "foreign"})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }

    // Get content of a book
    getContentBook(req, res, next) {
        Book.findOne({name: req.param('name')})
            .then(book => {
                res.send(monoMongooseObjects(book));
            })
            .catch(next);
    }

    // Get books type = Psychology
    getBooksPsychology(req, res, next) {
        Book.find({type: 'Psychology'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }

    // Get books type = History
    getHistoryBooks(req, res, next) {
        Book.find({type: 'History'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }

    // Get books type = economy
    getEconomyBooks(req, res, next) {
        Book.find({type: 'Kinh tế'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get books type = literature
    getLiteratureBooks(req, res, next) {
        Book.find({type: 'Văn học'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get books type = contemplation
    getContemplationBooks(req, res, next) {
        Book.find({type: 'Chiêm nghiệm cuộc sống'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get books type = self-growth
    getSelfGrowthBooks(req, res, next) {
        Book.find({type: 'Phát triển bản thân'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get books type = life skill
    getLifeSkillBooks(req, res, next) {
        Book.find({type: 'Kỹ năng sống'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get books type = communicate
    getCommunicateBooks(req, res, next) {
        Book.find({type: 'Kỹ năng giao tiếp'})
            .then(books => {
                res.send(mutipleMongooseObjects(books));
            })
            .catch(next);
    }
    // Get book by author
    getBookByAuthor(req, res, next) {
        Book.find({author: req.param('author')})
            .then(books => {
                res.send(mutipleMongooseObjects(books))
            })
            .catch(next);
    }

    // get Comments of a book
    getComments(req, res, next) {
        Book.findOne({name: req.param('name')})
            .populate('comments')
            .exec((err, comments) => {
                if (err) {
                    res.status(err).send(err);
                }
                else {
                    res.status(200).send(comments.comments);
                }
            })
    }

    // Create a new book
    async createBook(req, res, next)  {
        const data = req.body;
        try {
            const book = await Book.findOne({ name: data.name });
            if (book) {
                res.send({ message: "Book already exists!" });
            }
            else {
                const newBook = new Book({
                    name: data.name,
                    type: data.type,
                    price: data.price,
                    imgDes: data.imgDes,
                    author: data.author,
                    region: data.region,
                    publish: data.publish,
                    language: data.language,
                    numberPage: data.numberPage,
                    description: data.description,
                    publishCompany: data.publisher || " ",
                    sold: 0,
                    comments: []
                });
                await newBook.save();
                res.send({ message: "Book created successfully!" });
            }
        } 
        catch (err) {
            res.send({ message: err.message });
        }
    }

    // Delete a book
    deleteBook(req, res, next) {
        Book.deleteOne({_id: req.body._id})
            .then(book => {
                res.send({message: "Book deleted successfully!"});
            })
            .catch(next);
    }

    // Update a book
    updateBook(req, res, next) {
        Book.updateOne({_id: req.body._id}, req.body)
            .then(book => {
                res.send(monoMongooseObjects(book));
            })
            .catch((err => {
                res.send(err);
            }))
            .catch(next);
    }

    // generate code for book
    generateCode(req, res, next) {
        Book.find({type: 'Kĩ năng giao tiếp'})
            .then(books => {
                books.map(book => {
                    book.type = "Kỹ năng giao tiếp";
                    book.save();
                })
                res.send("Success!");
            })
            .catch(next);
    }

};

module.exports = new BookController;