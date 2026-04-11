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
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return res.status(201).json(userWithoutPassword);
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
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
        return res.status(200).json(usersWithoutPasswords);
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
        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json("Unauthorized");
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      req.body.image = req.file.path;

      if (existingUser.image) {
        deleteImgCloudinary(existingUser.image);
      }
    }

    const updateData = { ...req.body };

    if (req.body.posts) {
      updateData.$addToSet = {
        posts: { $each: req.body.posts }
      };
      delete updateData.posts;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return res.status(200).json(userWithoutPassword);

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const user = await User.findById(id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    // delete related posts
    await Post.deleteMany({ author: id }).session(session);

    // delete user
    await User.findByIdAndDelete(id).session(session);

    // commit DB first
    await session.commitTransaction();
    session.endSession();

    // delete image AFTER commit (external service)
    if (user.image) {
      await deleteImgCloudinary(user.image);
    }

    return res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

