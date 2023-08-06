const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    total: {type: Number, required: true},
    state: {type: Boolean}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Cart', Cart);