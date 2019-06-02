
// express related modules
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");


//database related modules
const db = require('../tools/db');

//authentication related modules
const passportConf = require ('../tools/passport')
const passport = require('passport')
const { validateBody, schemas }  = require ('../tools/validate')


//controllers
const user_controller = require ('../controllers/users')
const random_controller = require ('../controllers/random')
const email_controller = require ('../controllers/email')
/**
 * Test route
 */

router.all('/', async (req, res) => {
  return res.status(200).send('Hello Wor... *cough*.. Hello Jofi :)')
})


/** 
 * req.body {
 *  email : 
 *  firstname
 *  lastname
 *  password
 * }
 */
router.post("/register", 
  validateBody(schemas.authSchema),
  random_controller.hash_pass,
  user_controller.register,
  async (req, res) => {
    return res.status(200).send({message : "Please log in"})
  }
);

/**
 * req.body {
 *  email
 *  password
 * }
 */
router.post("/login", 
  validateBody(schemas.loginSchema),
  passport.authenticate('local', {session : false}),
  user_controller.sign_in  
)

router.all("/reset_password",
  email_controller.email_test,
  (req, res) => {
    console.log('here')
    return res.status(200).send('Done')
  }
)

//export the router
module.exports = router;
