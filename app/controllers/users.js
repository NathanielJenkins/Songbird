// const JWT = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
// const cryptoRandomString = require('crypto-random-string');
// const moment = require("moment");

// const JWT_SECRET = process.env.JSON_WEB_TOKEN;
// const qStrings = require(".././tools/sqlStrings");
// const query = require(".././tools/queryDatabase");
// const dbFail = require(".././tools/dbFailSafe");


// signToken = user => {
//     return  JWT.sign ({
//         iss: 'ergonoymx',
//         sub: user.id,
//         iat: new Date().getTime(), // current time
//         exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead     })
//     }, JWT_SECRET); 
// }



// module.exports = {
//     signUp : async (req, res) => {
//         console.log('inside signUp')
//         const b = req.body

//         //Hash the password using bcryptjs
//         const p0 = new Promise (function (resolve, reject){
//             bcrypt.genSalt(10, function(err, salt) {
//                 bcrypt.hash(b.password, salt, function(err, hash) {
//                     if (err) reject()
//                     resolve(hash)
//                 });
//             });
//         })

//         // check if there is a user with the email or username
//         // if there is no user, create them
//         p0.then(function (hashpass){

//             text =  qStrings.insertNewUserAndUserSettings
//             values =  values = [
//                 b.username,
//                 b.email.toLowerCase(),
//                 hashpass
//             ];  

//             query(text, values, (err, result) => {
            
//                 if (err){
//                   console.log("contraints", err.constraint)
//                   if (err.constraint == 'ix_user_table_username') return res.status(200).send("Username taken")
//                   if (err.constraint == 'ix_user_table_email' ) return res.status(200).send("Email taken")
//                   return dbFail.failSafe(err, res);
//                 }
//                 // Select the new user
//                 var newUser = result.rows[0]; 
          
//                 // make sure not to return the password hash
//                 delete newUser.password_hash;
    
//                 //generate and add the token to the newUser
//                 newUser.token = signToken (newUser); 

//                 // Respond with the newUser and the token
//                 return res.status(200).send(newUser);
//               }); 
//         })
//         .catch(function () {
//             return res.status(500).send({"err": "error occurred while hashing the password"})
//         })   
//     },



//     // Same as above but moves into temp user table first
//     signUpWithVerify : async (req, res, next) => {
//         const b = req.body 
//         console.log(b)
//         //Hash the password using bcryptjs
//         const p0 = new Promise (function (resolve, reject){
//             bcrypt.genSalt(10, function(err, salt) {
//                 bcrypt.hash(b.password, salt, function(err, hash) {
//                     if (err) reject()
//                     resolve(hash)
//                 });
//             });
//         })

//         // check if there is a user with the email or username if there is no user, create them
//         p0.then(function (hashpass){
//             text = qStrings.insertNewUserAndUserSettingsWithVerify
            
//             //set the values and use a random string as a token to be verified by the email
//             values = [
//                 b.username.toLowerCase(), 
//                 b.email.toLowerCase(), 
//                 hashpass, 
//                 cryptoRandomString({length: 64, type: 'url-safe'}),
//                 moment()
//             ];  

//             // perform the attempted insertion into the temp table query
//             query(text, values, (err, result) => {

//                 if (err) {

//                     //uniqueness constraint failed
//                     if ( err.code == 23505) 
//                         return res.status(200).send('Account already registered, please check your email and verify your account')
                    
//                     //other error
//                     return dbFail.failSafe(err, res);
//                 }

//                 //if the row was successfully inserted into the temp_user table
//                 if (result.rows[0].inserted){
//                     //set the token
//                     req.body.verification_token = result.rows[0].verification_token

//                     //delete the password from the req body
//                     delete req.body.password

//                     //continue onto the send email function in the email controller
//                     return next()
                
//                 //the row was inserted
//                 } else {
//                     console.log(result)

//                     //case the email was already taken
//                     if (result.rows[0].username == b.username) return res.status(200).send("Username taken")
                    
//                     //case the username was already taken
//                     if (result.rows[0].email == b.email) return res.status(200).send('Email taken')

//                     //should never hit
//                     return res.status(200).send("Could not create an account")
//                 }         
//             });            
//         })
//         .catch(function () {
//             return res.status(500).send({"err": "error occurred signing up"})
//         })   
//     },

//     signIn : async (req, res) => {

//         const user = req.body; 
//         const token = signToken(user);
//         user.token = token

//         return res.status(200).send(user)
//     },

// }