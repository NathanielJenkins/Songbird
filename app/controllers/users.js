const util = require('util');
const JWT = require('jsonwebtoken');
const schemas = require('../../src/models/index').schemas

// const cryptoRandomString = require('crypto-random-string');
// const moment = require("moment");

const JWT_SECRET = process.env.JWTSECRET;

signToken = user => {
    return  JWT.sign ({
        iss: 'jofi',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead     })
    }, JWT_SECRET); 
}



module.exports = {

    register: async (req, res, next) => {
        const user_data = req.body
        const UserModel = schemas.User; 

        // check if there is a user with the email if there is no user, create them
        const user = new UserModel(user_data) 

        user.save()
            
            .then(() => next())
            .catch(err => {
                
                //uniqueness error
                if (err.code == 11000){
                    return res.status(401).send({ "err": "email already in use" });
                }
                return res.status(500).send({"err": "trouble signing up"})
            })
    },

    sign_in :  (req, res) => {

        const user = req.user; 

        const token = signToken(user);
        user.token = token

        return res.status(200).send(user)
    },




};