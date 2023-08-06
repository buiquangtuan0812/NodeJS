const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    carts: [{
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    state: {type: Boolean},
    totalPrice: {type: Number, require: true},
    isCancel: {type: Boolean},
    code: {type: String},
    typePayment: {type: String}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Order', Order);