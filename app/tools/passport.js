// const passport = require('passport')
// var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;

// const LocalStrategy = require('passport-local').Strategy;
// const GooglePlusTokenStrategy = require('passport-google-plus-token')
// const JWT_SECRET  = process.env.JSON_WEB_TOKEN   

// const bcrypt = require('bcryptjs');

// const qStrings = require(".././tools/sqlStrings");
// const query = require(".././tools/queryDatabase");
// const dbFail = require(".././tools/dbFailSafe");


// //JSON web token strategy
// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey : JWT_SECRET
// }, async(payload, done) => {
//     try {
//         //find the user in the token
//         let text = qStrings.selectViaId;
//         let values = [payload.sub]; 
//         console.log(text, values)
//         query(text, values, (err, result) => {
//             if (err) throw new Error ('database error')
//             //user does not exist
//             if (result.rowCount == 0 ) return (null, false)
//             console.log('I am here')
//             return done(null, result.rows[0])            
//         });
        
//     } catch (error) {
//         return done(error, false)
//     }
// }));

// //Local strategy
// /**
//  * Notice, passport requires username, we will treat it either as an email or a username
//  */
// passport.use(new LocalStrategy({

// }, async (username, password, done) => {
//     try {
//     //Find the user given the username
//     const p0 = new Promise (function (resolve, reject){
//         text = qStrings.selectViaEmailOrUsername
//         values = [username, username]; 
//         query(text, values, (err, result) => {
//             if (err) reject()
//             if (result.rowCount == 0) resolve (null)
//             resolve (result.rows[0])
//         });
//     }); 
    
//     //Check if the password is correct
//     p0.then(function (user){
        
//         //case the user does not exist
//         if (!user) return (null, false);

//         //check if the passwords match
//         isMatch = bcrypt.compare(password, user.password_hash)
//         if (!isMatch)
//             throw new Error ('Passwords did not match')
        
//         delete user.password_hash    
//         return done(null, user)
        
//     }).catch(function () {
//         throw new Error ('Database Query Error')
//     })

//     //If not handle it
//     } catch (error){
//         return done(error, false)
//     }

// }));

// //Google auth strategy
// passport.use('googleToken', new GooglePlusTokenStrategy({
//     clientID: '53906216838-h8vcj9r9bad3rhl6vgdsgmavgr0fgcbg.apps.googleusercontent.com',
//     clientSecret: 'mIptDn4gScz76iyn82Me_Opr'
// }, async (accessToken, refreshToken, profile, done) =>{
//     console.log("accessToken", accessToken)
//     console.log("refreshToken", refreshToken)
//     console.log("profile", profile)
// }));

