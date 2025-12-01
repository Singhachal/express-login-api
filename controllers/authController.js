const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { response } = require("express");
const jwt = require("jsonwebtoken");

// Generate JWT Token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// Signup

exports.signup = async(req, res) => {
    try {
        const {name, email, password } = req.body;
        
        // check existing user
        const exist = await User.findOne({ email });
        if(exist) return res.status(400).json({ message: "Email already exists"});

        // hash password


        const hashed = await bcrypt.hash(password, 10);

        // create user 

        const user = await User.create({name, email, password: hashed});

        return res.json({

            message: "User Register Successfully",  
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token:generateToken(user._id)
        });
    }catch (error) {
        return res.status(500).json({message: error.message });
    }
};

// login

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        // check user

        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({message: "Invalid email or  password"});

        // match password

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json( { message: "Invalid email or  password"});

        return res.json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user.id)
        });
    }catch(error) {
        return res.status(500).json({message: error.message});
    }
}