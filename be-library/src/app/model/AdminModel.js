const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    imgDes: {type: String},
    token: {type: String},
    role: {type: String, default: 'Admin'},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Admin', Admin);