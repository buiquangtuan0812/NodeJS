const User = require('../model/AccountModel');
const {mutipleMongooseObjects, monoMongooseObjects} = require('../../util/mongoose');
const Cart = require('../model/CartModel');

class CartController {
    async addNewCart(req, res, next) {
        User.findOne({_id: req.user._id})
            .populate('carts')
            .exec((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    user.carts.map((cart) => {
                        if (cart.book === req.body.book) {
                            cart.quantity += 1;
                            cart.total += cart.price;
                            cart.save();
                            res.status(200).send({message: "Create successful!"});
                        }
                    })
                    const data = {
                        customer: req.user._id,
                        book: req.body.book,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        total: req.body.price * req.body.quantity,
                        state: false,
                    }
                    const newCart = new Cart(data);
                    newCart.save()
                        .then((success) => {
                            User.findOne({_id: req.user._id})
                                .then(user => {
                                    user.carts.unshift(success._id);
                                    user.save();
                                })
                                .catch(next);
                            res.status(200).send({message: "Create successful!"});
                        })
                        .catch(next);
                }
            })
    }

    getCarts(req, res, next) {
        User.findOne({_id: req.user._id})
            .populate('carts')
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({message: err.message});
                }
                else {
                    if (user.carts.length > 1) {
                        res.status(200).send(mutipleMongooseObjects(user.carts));
                    }
                    else {
                        res.status(200).send(monoMongooseObjects(user.carts));
                    }
                }
            })
    }

    // delete cart
    async deleteCart(req, res, next) {
        try {
            await Cart.findOneAndDelete({ _id: req.body.idCart });
            const user = await User.findOne({ _id: req.user._id });
            user.carts = user.carts.filter((cart) => cart._id !== req.body.idCart);
            await user.save();
            res.status(200).send({ message: 'Cart deleted successfully' });
        } 
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = new CartController;