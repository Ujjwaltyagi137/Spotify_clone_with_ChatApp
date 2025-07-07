const { Router } = require("express");
const { getAllAlbums, getAlbumById } = require("../controller/albumcontroller");

const router = Router();

router.get('/', getAllAlbums)
router.get('/:albumId', getAlbumById);

module.exports = router;