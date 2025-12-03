const Comment = require("../models/Comment");
const Post = require("../models/Post");

// add Comment to a post

exports.addComment = async (req, res) =>{
    try{
        const postId = req.params.postId;
        const { content } = req.body;

        if(!postId.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ message: "Invalid Post ID"});
        }

        if(!content) {
            return res.status(400).json({ message: "commment content is required"});
        }

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: "Post not  found"});
        }

        const comment = new Comment({
            post: postId,
            content,
            commentedBy: req.user.id
        });

        await comment.save();

        res.status(201).json({
            message: "Commented added successfully",
            comment
        });
    } catch (error) {
        console.error("addComment Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


//  get all commented

exports.getComments = async (req, res) => {
    try {
        const postId = req.params.postId;

        if(!postId.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const comments = await Comment.find({ post: postId })
            .populate("commentedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Comments fetched successfully",
            comments
        });
    }
    catch (error) {
        console.error("getComments Error:", error.message);
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
