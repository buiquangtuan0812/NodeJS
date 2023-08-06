const Cart = require('../model/CartModel');
const Order = require('../model/OrderModel');
const Account = require('../model/AccountModel');
const Book = require('../model/BookModel');
const { mutipleMongooseObjects, monoMongooseObjects } = require('../../util/mongoose');

class OrderController {
    // solve buy book of user
    addBillUser(req, res, next) {
        const listCart = req.body.listCart;
        const idUser = req.user._id;
        const BillCart = new Order({
            user: idUser,
            totalPrice: req.body.totalPrice,
            state: req.body.pay,
            isCancel: false,
            carts: [],
            typePayment: req.body.typePayment,
            code: Math.round(Math.random() * 1000000000),
        })
        listCart.map((item, index) => {
            BillCart.carts.push(item.idCart);
            Cart.findOne({_id: item.idCart})
                .then(cart => {
                    cart.state = true;
                    cart.quantity = item.quantity;
                    cart.total = item.value.price * item.quantity;
                    cart.save();
                    Book.findOne({_id: cart.book})
                        .then(book => {
                            book.sold += 1;
                            book.save();
                        })
                        .catch(next);
                })
                .catch(next);
        })
        BillCart.save((err, response) => {
            if (err) {
                res.send(err);
            }
            else {
                Account.findOne({_id: idUser})
                    .then (user => {
                        if (user.orders) {
                            user.orders.unshift(response._id);
                        }
                        else {
                            user.orders = [];
                            user.orders.unshift(response._id);
                        }
                        user.coin += req.body.totalPrice * 0.015;
                        user.save();
                        res.send(response);
                    })
                    .catch(next);
            }
        })
    }

    getOrder(req, res, next) {
        Account.findOne({ _id: req.user._id })
            .populate("orders")
            .exec((err, results) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    var promises = results.orders.map((order) => {
                        return new Promise((resolve, reject) => {
                            Order.findOne({ _id: order })
                                .populate("carts")
                                .exec((err, cart) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        var subPromises = cart.carts.map((item) => {
                                            return new Promise((resolve, reject) => {
                                                Cart.findOne({ _id: item._id })
                                                    .populate("book")
                                                    .exec((err, result) => {
                                                        if (err) {
                                                            reject(err);
                                                        } else {
                                                            resolve(result);
                                                        }
                                                });
                                            });
                                        });
                                        Promise.all(subPromises)
                                            .then((data) => {
                                                resolve({ totalPrice: cart.totalPrice, carts: data, order: order });
                                            })
                                            .catch((err) => {
                                                reject(err);
                                            });
                                    }
                                });
                        });
                    });
      
                    Promise.all(promises)
                        .then((data) => {
                        res.status(200).send(data);
                        })
                        .catch((err) => {
                        res.status(500).send(err);
                        });
                }
            });
    }

    cancelOrder(req, res, next) {
        Order.findOne({_id: req.body._id})
            .then(async order => {
                order.isCancel = true;
                await order.save();
                res.status(200).send(monoMongooseObjects(order));
            })
            .catch(err => res.status(err.code).send(err));
    }

}

module.exports = new OrderController;