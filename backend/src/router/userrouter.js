const { Router } = require("express");
const { protectRoute } = require("../middleware/authmiddleware");
const { getAllUsers, getMessages, syncClerkUserFromFrontend } = require("../controller/usercontroller");


const router = Router();

router.post("/auth/callback", syncClerkUserFromFrontend);
router.get('/', protectRoute, getAllUsers)
router.get("/messages/:userId", protectRoute, getMessages);
module.exports = router;