const message = require("../models/messagemodel");
const user = require("../models/usermodel");
const { clerkClient } = require("@clerk/clerk-sdk-node");

const syncClerkUserFromFrontend = async (req, res) => {

  const { id, firstName, lastName, imageUrl } = req.body;

  if (!id || !firstName || !lastName || !imageUrl) {
    return res.status(400).json({ message: "Missing user fields" });
  }

  try {
    const existingUser = await user.findOne({ clerkId: id });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = await user.create({
      fullName: `${firstName} ${lastName}`,
      imageUrl,
      clerkId: id,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("Error syncing user from frontend:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllUsers = async (req,res,next)=>{
    try {
        const { userId } = await req.auth();
        const Users = await user.find({ clerkId: { $ne: userId } });
        console.log("fetched user", Users);
        return res.status(200).json(Users);
    } catch (error) {
        next(error)
    }
}

const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};
module.exports = {getAllUsers , getMessages ,syncClerkUserFromFrontend}