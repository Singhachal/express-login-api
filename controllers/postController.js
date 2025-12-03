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

// POST by ID

exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        // validate mongoDB objectId
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        // find post & populate user info
        const post = await Post.findById(postId).populate("createdBy", "name email");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post fetched successfully",
            post
        });

    } catch (error) {
        console.error("getPostById Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id; // <-- FIXED
        const { title, content } = req.body;

        if(!postId.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        // Find the post
        const post = await Post.findById(postId);
        if(!post) { // <-- FIXED
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if logged-in user is the owner
        if(post.createdBy.toString() !== req.user.id){
            return res.status(403).json({ message: "You are not allowed to update this post" });
        }

        // Update post fields
        if(title) post.title = title;
        if(content) post.content = content;

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        console.error("updatePost Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};



// DELETE POST BY ID (OWNER ONLY)

exports.deletePost = async (req, res) => {
    try{
        const postId = req.params.id;

        // validate 
        if(!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Post ID"});
        }

        // Find the post

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if logged-in user is the owner

        if(post.createdBy.toString() !==req.user.id) {
            return res.status(403).json({ message: "You are not allowed to delete this post"});
        }

        // delete post

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            message: "Post Deleted Successfully"
        });
    }catch (error) {
        console.error("deletePost Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}