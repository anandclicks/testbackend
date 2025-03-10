const UserModel = require("../models/User.model");

const handleFollowUnfollowLogic = async (req, res) => {
  const { loggedInUser } = req; 
  const { wantToFollowOrUnfollowUserId } = req.body; 

  try {
    // Check if logged-in user exists
    if (!loggedInUser) {
      return res.status(400).json({
        message: "You need to login!",
        status: 400,
      });
    }

    // get both users from the database
    const loginUserDbReff = await UserModel.findOne({ email: loggedInUser.email });
    const wantToFollowOrUnfollowUserDbReff = await UserModel.findOne({ _id: wantToFollowOrUnfollowUserId });

    // Checking
    if (!loginUserDbReff || !wantToFollowOrUnfollowUserDbReff) {
      return res.status(404).json({
        message: "User not found!",
        status: 404,
      });
    }

    // Check if the logged-in user is already following the other user
    const isAlreadyFollowing = loginUserDbReff.following.includes(wantToFollowOrUnfollowUserId);

    if (!isAlreadyFollowing) {
      // Follow
      await UserModel.findOneAndUpdate(
        { _id: loginUserDbReff._id },
        { $push: { following: wantToFollowOrUnfollowUserId } }
      );
      await UserModel.findOneAndUpdate(
        { _id: wantToFollowOrUnfollowUserId },
        { $push: { followers: loginUserDbReff._id } }
      );

      return res.status(200).json({
        message: "Followed successfully",
        status: 200,
      });
    } else {
      // Unfollow 
      await UserModel.findOneAndUpdate(
        { _id: loginUserDbReff._id },
        { $pull: { following: wantToFollowOrUnfollowUserId } }
      );
      await UserModel.findOneAndUpdate(
        { _id: wantToFollowOrUnfollowUserId },
        { $pull: { followers: loginUserDbReff._id } }
      );

      return res.status(200).json({
        message: "Unfollowed successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in follow/unfollow:", error);
    return res.status(500).json({
      message: "Something went wrong!",
      status: 500,
    });
  }
};

module.exports = { handleFollowUnfollowLogic };