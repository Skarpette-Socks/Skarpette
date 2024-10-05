const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        min: 8,
        max: 16,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16,
    },
    role: {
        type: String,
        enum: ['admin', 'mod'],
        required: true,
    },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
