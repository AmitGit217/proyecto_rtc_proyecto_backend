

import mongoose from 'mongoose';
import { connectDB } from '../config/dbConnect.js';
import User from '../entities/user/user.model.js';
import users from './user.data.js';


const seedUsers = async () => {
    await connectDB()
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
        await User.collection.drop(); 
    }
    try {
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }finally {
        mongoose.disconnect();
    }   

};

export default seedUsers;