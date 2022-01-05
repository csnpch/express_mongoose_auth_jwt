const mongoose = require('mongoose');

const collection = 'user';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    token: { type: String },
}, {
    timestamp: true,
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, userSchema);