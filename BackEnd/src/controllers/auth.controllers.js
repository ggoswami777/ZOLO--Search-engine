const bcrypt  = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");


exports.register = async (req , res) =>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "All Field required"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password , 12);

        await User.create({
            email , 
            password : hashedpassword
        });
        res.status(201).json({message : "User registered successfully"});

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

exports.login = async (req , res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            res.status(400).json({message : "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            res.status(400).json({message : "Invalid credentials"});
        }

        const token = generateToken(user._id);
        res.cookie("token" , token , {
            httpOnly : true,
            secure : false,
            sameSite : "strict"
        })

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
