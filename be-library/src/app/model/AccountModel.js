const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {type: String},
    imgDes: {type: String},
    tel: {type: String},
    address: {type: String},
    birthDate: {type: String},
    email: {type: String},
    coin: {type: Number},
    token: {type: String},
    role: {type: String},
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    carts: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Account', Account);