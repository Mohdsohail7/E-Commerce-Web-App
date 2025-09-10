const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ======================
// generate token
// ======================
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d"});

};

// ======================
// Register handle
// ======================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required."});

        // check user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user);
        
        // return successfull response
        return res.status(201).json({ token, user });

    } catch (error) {
        console.log("Error sending from register.", error);
        return res.status(500).json({ message: "Server Error"});
    }
};

// ======================
// Login handle
// ======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // input validation
        if (!email || !password) return res.status(400).json({ message: "Email and password required."});

        // user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found."});
        }

        // password verify
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials."});
        }

        const token = generateToken(user);
        // return response
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server Error."});
    }
};


exports.me = async (req, res) => {
    res.json(req.user);
}

