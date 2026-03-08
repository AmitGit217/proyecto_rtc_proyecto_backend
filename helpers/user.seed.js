import mongoose from 'mongoose';
import { connectDB } from '../config/dbConnect.js';
import User from '../entities/user/user.model.js';
import users from './user.data.js';
const seedUsers = async () => {
    try {
        await connectDB();

        const existingUsers = await User.find();
        if (existingUsers.length > 0) {
            await User.collection.drop();
        }

        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        await mongoose.disconnect();
    }
};

seedUsers();

export default seedUsers;