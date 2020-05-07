// express related modules
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//authentication related modules
const passportConf = require("../tools/passport");
const passport = require("passport");
const { validateBody, schemas } = require("../tools/validate");

//controllers
const user_controller = require("../controllers/users");
const random_controller = require("../controllers/random");
const email_controller = require("../controllers/email");
/**
 * Test route
 */

router.all("/", async (req, res) => {
	return res.status(200).send("Hello Wor... *cough*.. Hello SongBird :)");
});

/**
 * req.body {
 *  email :
 *  firstname
 *  lastname
 *  password
 * }
 */
router.post(
	"/register",
	validateBody(schemas.authSchema),
	random_controller.hash_pass,
	user_controller.register,
	async (req, res) => {
		return res.status(200).send({ message: "Please log in" });
	}
);

/**
 * req.body {
 *  email
 *  password
 * }
 */
router.post(
	"/login",
	validateBody(schemas.loginSchema),
	passport.authenticate("local", { session: false }),
	user_controller.sign_in
);

/** req.body {
 *  email
 * } */
router.post(
	"/reset_password",
	validateBody(schemas.resetPassword),
	email_controller.reset_password,
	(req, res) => {
		console.log("here");
		return res.status(200).send("Done");
	}
);

/** req.query
 * token
 */
router.get(
	"/reset_password_confirm",
	// set the header to the jwt
	(req, res, next) => {
		token = req.query.token;
		req.headers.authorization = `Bearer ${token}`;
		next();
	},
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		//change the password to the password in the body ?
		return res.status(200).send({ authorization: "success" });
	}
);

//export the router
module.exports = router;
