const album = require("../models/albummodel")

const getAllAlbums = async (req,res,next)=>{
    try {
        const Albums = await album.find();
        return res.status(200).json(Albums);
    } catch (error) {
        next(error)
    }
}

const getAlbumById = async (req,res,next)=>{
    try {
        const {albumId} = req.params;
        const Album = await album.findById(albumId).populate("songs")
        if (!Album) {
        return res.status(404).json({ message: 'Album not found' });
}
        return res.status(200).json(Album)
    } catch (error) {
        next(error)
    }
}   

module.exports = {getAllAlbums,getAlbumById}