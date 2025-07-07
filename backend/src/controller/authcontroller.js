const message = require('../models/messagemodel');
const user = require('../models/usermodel');

const authCallback = async( req , res) => {
    try {
        const User = await user.findOne({
            clerkId : req.body.id
        })
        if(!User){
            await user.create({
                clerkId : req.body.id,
                fullName :  `${req.body.firstName} ${req.body.lastName}`,
                imageUrl : req.body.imageUrl
            })
        }
        return res.status(200).json({ success : true});
    } catch (error) {
        console.log("error in auth callback ", error);
        return res.status(500).json({success: false, message: "internal server error"
        });
    }
}

module.exports = authCallback;