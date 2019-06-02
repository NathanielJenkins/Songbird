const util = require('util');
const JWT = require('jsonwebtoken');

// const cryptoRandomString = require('crypto-random-string');
// const moment = require("moment");

const JWT_SECRET = process.env.JWTSECRET;

const db = require('../tools/db')

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
        try {
            const user = req.body
        
            // check if there is a user with the email or username if there is no user, create them
            sql = `insert into user (iduser, email, password, firstname, lastname) values (UUID_TO_BIN(UUID()), ?, ?, ?, ?);`
            values = [user.email, user.password, user.firstname, user.lastname]

            //inserts the user
            var query = await db.query(sql, values)

            next(); 
            
        } catch (err){
            console.log(err)

            //check if the error is a uniqueness contraint
            if (err.errno == 1062) 
                return res.status(401).send({"err" : "email already in use"});
            
            //remove the row if it was added to the database
            sql = 'delete from user where email = ?'
            values = [user.email]    
            db.query(sql, values)

            return res.status(500).send({"err": "error occurred signing up"})
        }
    },

    sign_in :  (req, res) => {

        const user = req.user; 

        const token = signToken(user);
        user.token = token

        return res.status(200).send(user)
    },



};