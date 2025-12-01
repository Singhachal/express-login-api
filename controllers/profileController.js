const User = require('../models/User');

// get logged-in profile

const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({message: "User not  found" });
        res.json(user);
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

// Update profile (partial Update)

const updateProfile = async (req, res) => {
    try {
        const update = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, update, {new: true }).select("-password");
        res.json({ message: "Profile updated", user});
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getProfile, updateProfile};