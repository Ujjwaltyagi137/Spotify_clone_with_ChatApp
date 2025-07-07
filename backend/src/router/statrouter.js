const { Router } = require("express");
const { protectRoute, requireAdmin } = require("../middleware/authmiddleware");
const getStats = require("../controller/statcontroller");


const router = Router();

router.get('/', protectRoute , requireAdmin , getStats);


module.exports = router;