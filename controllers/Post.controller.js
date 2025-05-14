const postModal = require("../models/Posts.model");

const createPost = async (req, res) => {
  const { title, caption } = req.body;
  
  const imageUrl = req.file?.filename;
  
  if (!title || !caption || !imageUrl) {
    return res.json({
      message: "All Three fileds are required!",
      success: false,
      status: 403,
    });
  }
  if (title && caption && imageUrl) {
    const createdPost = await postModal.create({
      title,
      caption,
      imageUrl: imageUrl || "/public/uploads/defaultProfile.png",
    });

    if (!createdPost) {
    return res.json({
      message: "Post could'nt created!",
      success: false,
      status: 502,
    });
  } else {
    return res.json({
      message: "Post created successfully!",
      success: true,
      status: 200,
    });
  }
  }
  
};


module.exports = {createPost}