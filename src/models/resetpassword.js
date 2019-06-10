const mongoose = require('mongoose');

const ResetPassSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    token: String,
})

module.exports = mongoose.model('ResetPass', ResetPassSchema)