import { deleteImgCloudinary } from "../../config/flieStorage.js";
import User from "../user/user.model.js";
import Post from "./post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newPost = new Post({ title, description });
        if (req.file) {
            newPost.image = req.file.path;
        }
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }  
};


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;  
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
         const user = req.user;
        const userPosts = await User.findById(user._id).populate('posts');
        if (!userPosts.posts.some(post => post._id.toString() === id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const updatedPost = await Post.updateOne({ _id: id }, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const userPosts = await User.findById(user._id).populate('posts');
        if (!userPosts.posts.some(post => post._id.toString() === id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        deleteImgCloudinary(deletedPost.image);
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};  



