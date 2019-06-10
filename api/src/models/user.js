const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String, 
        unique : true, 
    },
    password : String,
    firstname : String, 
    lastname : String,
    datecreated: Date
})

UserSchema.statics.findByEmail = async function (email) {
    let user = await this.findOne({
        email: email,
    });
    return user;
}

module.exports = mongoose.model('User', UserSchema)