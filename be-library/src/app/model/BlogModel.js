const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const author = new Schema({
    role: {type: String},
    imgDes: {type:String},
    name: {type: String, required: true},
})

const content = new Schema({
    text: {type: String, required: true},
    image: {type: Object}
})

const interact = new Schema({
    like: {type: Number},
    list: [{
        type: Schema.Types.ObjectId,
        ref: "Account",
    }]
})


const Blog = new Schema({
    author: author,
    title: {type: String},
    content: content,
    shortDes: {type:String},
    interact: interact,
    slug: {type: String, slug: "title"},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "CommentBlog"
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('Blog', Blog);