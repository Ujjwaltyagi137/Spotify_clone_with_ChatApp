const { Router } = require("express");
const authCallback = require("../controller/authcontroller");

const router = Router();

router.post('/callback', authCallback);

module.exports = router;