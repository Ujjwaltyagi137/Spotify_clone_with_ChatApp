const { Router } = require("express");
const { protectRoute } = require("../middleware/authmiddleware");
const { getAllUsers, syncClerkUserFromFrontend } = require("../controller/usercontroller");


const router = Router();

router.post("/auth/callback", syncClerkUserFromFrontend);
router.get('/', protectRoute, getAllUsers)

module.exports = router;