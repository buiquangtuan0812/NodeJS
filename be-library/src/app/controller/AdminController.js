const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../model/AdminModel');
const Book = require('../model/BookModel');

class AdminController {

    // Sign up a account administrator
    signup(req, res, next) {
        const admin = new Admin({
            name: req.body.name,
            fullName: req.body.fullName,
            imgDes: "https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg",
            role: "Admin"
        });
        const password = bcrypt.hashSync(req.body.password, 10);
        admin.password = password;
        const token = jwt.sign({
            admin_id: admin._id,
            name: admin.name,
        }, process.env.TOKEN_KEY);
        admin.token = token;
        admin.save((err, user) => {
            if (!err) {
                res.status(200).send({message: "Admin saved successfully"});
            }
            else {
                res.status(500).send({message: err.message});
            }
        })
    }

    // Search a book in list book
    searchBook(req, res, next) {
        Book.findOne({name: req.param('name')})
            .then(book =>{
                res.render('admin', {
                    length: book.length > 1,
                    title: 'managementBook',
                    books: monoMongooseObjects(book)
                })
            })
            .catch(next);
    }

    // Get a book in list book
    getBookDetails(req, res, next) {
        Book.findOne({name: req.param('name')})
            .then(book =>{
                res.send(book);
            })
            .catch(next);
    }
}

module.exports = new AdminController;