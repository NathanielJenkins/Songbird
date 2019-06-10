
// Passport authentication
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWT_SECRET = process.env.JWTSECRET   

//Hashing and encrypting
const bcrypt = require('bcryptjs');

//databases
const schemas = require('../../src/models/index').schemas

//Local strategy
/**
 * Notice, passport requires username, we will treat it either as an email or a username
 */
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done) => {
    //Find the user given the username
    const UserModel = schemas.User
    const db_user = await UserModel.findByEmail(email)

    //they do not exist 
    if (! db_user) return done(null, false)

    //Check if the password is correct
    bcrypt.compare(password, db_user.password, function (err, res) {

        if (err) return done(err, false)
        delete db_user.password

        if (res){
            const user = {
                firstname : db_user.firstname,
                lastname : db_user.lastname,
                email: db_user.email
            }
            return done(null, user)
        } 
        else return done(null, false)
    }); 
}));


//JSON web token strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET
}, async(payload, done) => {
    const UserModel = schemas.User
    const email = payload.sub
    const db_user = UserModel.findByEmail(email)
    .then ((db_user) => {
        if (!db_user) return done(null, false)
        return done(null, db_user)
    })
    .catch ((err) => {
        return done(err, false)
    }) 
}));
