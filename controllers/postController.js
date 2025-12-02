const Post = require("../models/Post");

// create Post

exports.createPost = async(req, res) => {
    const {title, content} = req.body;

    if(!title || !content) {
        return res.status(400).json({ message: "Title and Content are required"});
    }

    try {
        const post = new Post({
            title,
            content,
            createdBy:req.user.id
        });

        await post.save();

        return res.status(201).json({
            message: "Post created successfully",
            post
        }); // <-- IMPORTANT
        
    }catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server Error'})
    }
};

//Get All POST


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy', 'name email'); // FIXED
        res.json(posts);
    } catch (error) {
        console.error("GetAllPosts Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
