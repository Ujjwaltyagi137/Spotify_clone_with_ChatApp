const { Router } = require("express");
const {createSong , deleteSong, createAlbum, deleteAlbum, checkAdmin} = require("../controller/admincontroller");
const { protectRoute, requireAdmin } = require("../middleware/authmiddleware");

const router = Router();

router.use(protectRoute , requireAdmin)

router.get('/check', checkAdmin )
router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong );
router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum );




module.exports = router;