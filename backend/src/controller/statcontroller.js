const song = require("../models/songmodel");
const user = require("../models/usermodel");
const album = require("../models/albummodel");

const getStats =  async (req,res,next)=>{
    try {
        const [totalSongs,totalUsers,totalAlbums , uniqueArtists] = await Promise.all([
            song.countDocuments(),
            user.countDocuments(),
            album.countDocuments(),

            song.aggregate([
                {
                    $unionWith : {
                        coll : "albums",
                        pipeline : []
                    }
                },
                {
                        $group : { 
                        _id : "$artist",
                        }
                },
                {
                    $count : "count"
                },
            ])
        ])

        return res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0
        })

    } catch (error) {
        next(error)
    }
}

module.exports = getStats