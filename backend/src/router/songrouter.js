const { Router } = require("express");
const { protectRoute, requireAdmin } = require("../middleware/authmiddleware");
const { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } = require("../controller/songcontroller");


const router = Router();

router.get('/', protectRoute , requireAdmin , getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);

module.exports = router;