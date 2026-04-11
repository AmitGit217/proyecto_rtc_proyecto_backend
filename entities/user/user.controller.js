import { deleteImgCloudinary } from "../../config/fileStorage.js";
import { generateToken } from "../../helpers/jwt.js";
import User from "./user.model.js";
import bcrypt from 'bcrypt';

export const createUser = async (req, res, next) => {
    try {
        const { userName, email, password, image } = req.body;
        const newUser = new User({ userName, email, password: password, image });
        if (req.file) {
            newUser.image = req.file.path;
        }
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
          if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        next(error);
    }  
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.email, user.role);
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('posts');
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const user = await User.findById(id).populate('posts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.file) {
            req.body.image = req.file.path;
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file && existingUser.image) {
            deleteImgCloudinary(existingUser.image);
        }
        const posts = existingUser.posts;
        req.body.posts = [...posts, ...(req.body.posts || [])];

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            req.body,
            { returnDocument: 'after' }
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (deletedUser.image) {
            deleteImgCloudinary(deletedUser.image);
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};  

