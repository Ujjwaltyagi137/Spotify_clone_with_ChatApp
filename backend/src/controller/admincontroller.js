const  cloudinary  = require("../connections/cloudinary");
const album = require("../models/albummodel");
const song = require("../models/songmodel");

const uploadToCloudinary = async (file)=>{
    try {
        console.log("Uploading file to Cloudinary:", file.tempFilePath);
        const result = await  cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        })
         console.log("✅ Cloudinary upload successful:", result.secure_url);
        return result.secure_url;
    } catch (error) {
         console.error(" Cloudinary Upload Error:");
        console.error("Full Error:", error);
        console.error("File Path:", file?.tempFilePath);
        throw new Error("error uploading to cloudinary");
    }
}

const createSong = async (req , res,next)=>{
    try {
        if(!req.files || !req.files?.imageFile || !req.files?.audioFile){
            return res.status(400).json({message : "upload all files"});
        }
    const {title , artist , albumId , duration} = req.body
    const audioFile = req.files.audioFile  
    const imageFile = req.files.imageFile



    const audioUrl = await uploadToCloudinary(audioFile)
    const imageUrl = await uploadToCloudinary(imageFile)
      const Song = new song({
        title , 
        artist ,
        audioUrl,
        imageUrl,
        duration,
        albumId : albumId || null,
      })
      await Song.save()
      if(albumId){
        await album.findByIdAndUpdate(albumId , {
            $push : { songs : Song._id}
        })
      }
      return res.status(201).json(song)
    } catch (error) {
        console.log("Error in createSong", error);
        next(error)  
      }
}

const deleteSong = async (req ,res , next)=>{
    try {
        const {id} = req.params;
        const Song = await song.findById(id);
        if(Song.albumId){
            await album.findByIdAndUpdate(Song.albumId , {
            $pull : { songs : Song._id}
        })
        }
        await song.findByIdAndDelete(id)

        return res.status(201).json({message : " song delete successfully"})
    } catch (error) {
        console.log("error in deleting", error);
        
        next(error)
    }
}

const createAlbum = async (req,res , next) =>{
    try {
        const {title ,artist ,releaseYear} =  req.body;
        const {imageFile} = req.files
        const imageUrl = await uploadToCloudinary(imageFile);
         
        const Album = new album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await Album.save();
        return res.status(201).json(Album);
    } catch (error) {
        console.log('ERROR IN CREATING ALBUM');
        next(error) 
    }
}

const deleteAlbum = async (req,res,next)=>{
    try {
        const {id} = req.params;
        await song.deleteMany({albumId : id});
        await album.findByIdAndDelete(id);
        return res.status(201).json({message : " album delete successfully"})

    } catch (error) {
        console.log("failed to delete album", error);
        next(error);
    }
}

const checkAdmin = async (req,res,next) =>{
    try {
        res.status(200).json({admin : true});
    } catch (error) {
        console.log("error", error);
        next(error);
    }
}
module.exports = {createSong , deleteSong , createAlbum , deleteAlbum , checkAdmin};