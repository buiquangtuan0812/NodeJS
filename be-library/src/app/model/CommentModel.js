const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    rating: {type: Number, require: true},
    title: {type:String},
    like: {type: Number},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
});

module.exports = mongoose.model('Comment', Comment);
