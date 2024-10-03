import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

const roles = ['admin', 'chess', 'tennis']; 

// Register a new user
export const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    // Check if the role is valid
    if (!roles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = await User.create({ username, password, role });
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user and return JWT
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token,user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Protected route example
export const getProtectedResource = (req, res) => {
    res.json({ message: `Welcome ${req.userRole}! This is a protected resource.` });
};
