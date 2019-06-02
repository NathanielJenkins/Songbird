const nodemailer = require("nodemailer");
const Email = require ('email-templates'); 


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSERNAME,
        pass: process.env.EMAILPASSWORD
    }
});


module.exports = {
    // send mail with defined transport object
    email_test :  (req, res, next) => {
        const email = new Email ({
            transport : transporter,
            send: true, 
            preview: false
        }); 

        email.send({
            template: 'mars',
            message: {
                to: 'njboale@gmail.com'
            },
            locals : {
                name : 'Elon'
            }
        }).then(() => console.log('email has been send!'));

            //     transporter.sendMail({
            //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
            //     to: "njboale@gmail.com", // list of receivers
            //     subject: "Hello ✔", // Subject line
            //     text: "Hello world?", // plain text body
            //     html: "<b>Hello world?</b>" // html body
            // })
        next();
    }   
}



