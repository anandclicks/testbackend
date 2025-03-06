const UserModel = require("../models/User.model")

const handleFollowUnfollowLogic = async(req,res)=> {
    const {loggedInUser} = req
    const {wantToFollowOrUnfollowUserId} = req.body
    console.log(loggedInUser);
    
    const loginUserDbReff = await UserModel.findOne({email : loggedInUser.email})
    const wantToFollowOrUnfollowUserDbReff = await UserModel.findOne({_id : wantToFollowOrUnfollowUserId})
  
    // checking 
    if(!loggedInUser){
        return res.json({
            message : "You need to login!",
            status : 400
        })
    };
    if(!wantToFollowOrUnfollowUserId || !wantToFollowOrUnfollowUserDbReff){
        return res.json({
            message : "User not found!",
            status : 404
        })
    }
    // follow logic
    const isLoggedInUserAlreadyFollow = loginUserDbReff.following.map((id)=> toString(id) == toString(loginUserDbReff._id))
    console.log(isLoggedInUserAlreadyFollow.length);
    
    if(!isLoggedInUserAlreadyFollow.length){
        loginUserDbReff.following.push(wantToFollowOrUnfollowUserDbReff._id)
        await loginUserDbReff.save()
        wantToFollowOrUnfollowUserDbReff.followers.push(loginUserDbReff._id)
        await wantToFollowOrUnfollowUserDbReff.save()

        // sending response after start following 
        return res.json({
            message : "Followed sucessfully",
            status : 200
        });
    }else {
        loginUserDbReff.following = loginUserDbReff.following.filter((id) => toString(id) != toString(wantToFollowOrUnfollowUserDbReff))
        await loginUserDbReff.save()
        wantToFollowOrUnfollowUserDbReff.followers = wantToFollowOrUnfollowUserDbReff.followers.filter((id)=> toString(id) != toString(loginUserDbReff._id))
        await wantToFollowOrUnfollowUserDbReff.save()

        // sending response after unfollow user
        return res.json({
            message : "Unfollowed sucessfully",
            status : 200
        });
    }

}

module.exports = {handleFollowUnfollowLogic}