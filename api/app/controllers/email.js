const nodemailer = require("nodemailer");
const Email = require ('email-templates'); 
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWTSECRET;
const API_URL = process.env.API_URL;
const schemas = require('../../src/models/index').schemas

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSERNAME,
        pass: process.env.EMAILPASSWORD
    }
});


module.exports = {
    

    // send mail with defined transport object
    reset_password :  (req, res, next) => {
        const email = new Email ({
            transport : transporter,
            send: false, 
            preview: true
        }); 

        const email_address = req.body.email

        //generate the jwt token for the user
        const jwt_token = JWT.sign({
            iss: 'jofi',
            sub: email_address,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getHours() + 1) // current time + 1 hour ahead
        }, JWT_SECRET); 
        
        email.send({
            template: 'resetpass',
            message: {
                to: email_address
            },
            locals : {
                url : `${API_URL}/reset_password_confirm?token=${jwt_token}`
            }

        }).then( (res) => {
            const ResetPassModel = schemas.ResetPass;
            //create the user in the reset password table
            let options = {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
            const obj = {
                email: email_address,
                token: jwt_token
            }

            ResetPassModel.findOneAndUpdate({ email: email_address }, obj, options)
                .then(() => next())
                .catch(err => {
                    return res.status(500).send({err : 'could not update or create the user'})
                });

        }).catch((err) => {
            res.status(500).send({ err: 'could not send email' })
        }); 
        
        

       

    }   
}



