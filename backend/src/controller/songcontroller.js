const album = require("../models/albummodel");
const song = require("../models/songmodel");

const getAllSongs = async (req,res,next)=>{
    try {
        const songs = await song.find().sort({ createdAt: -1 });
		res.json(songs);

    } catch (error) {
        next(error)
    }
}

const getFeaturedSongs = async (req,res,next)=>{
    try {
        const Songs = await song.aggregate([
            {
                $sample : { size : 6}
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
        res.json(Songs)
    } catch (error) {
        next(error);
    }
}
const getTrendingSongs = async (req,res,next)=>{
     try {
        const Songs = await song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
        res.json(Songs)
    } catch (error) {
        next(error);
    }
}
const getMadeForYouSongs = async (req,res,next)=>{
     try {
        const Songs = await song.aggregate([
            {
                $sample : { size : 4}
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
        res.json(Songs)
    } catch (error) {
        next(error);
    }
}
module.exports = {getAllSongs , getFeaturedSongs , getTrendingSongs , getMadeForYouSongs}