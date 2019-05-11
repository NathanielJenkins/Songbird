
// express related modules
const express = require("express");
const router = express.Router();

//database related modules
const query = require('../tools/query');

/**
 * Test route
 */
router.all('/test_route', async (req, res) => {
    return res.status(200).send('Hello Wor... *cough*.. Hello Jofi :)')
})

//export the router
module.exports = router;
