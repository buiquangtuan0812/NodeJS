const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const Book = new Schema({
    name: {type: String, min: 120},
    author: {type: String, min: 60},
    publish: {type: String, length: 4},
    publishCompany: {type: String, required: true},
    numberPage: {type: Number, required: true},
    price: {type: Number, required: true},
    imgDes: {type: String},
    type: {type: String},
    region: {type: String},
    description: {type: String, min:200},
    language: {type: String},
    quantity: {type: Number},
    sold: {type: Number},
    slug: {type: String, slug: "name"},
    code: {type: String},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Book', Book);