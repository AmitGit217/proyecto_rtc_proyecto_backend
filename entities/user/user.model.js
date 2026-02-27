import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userName: {type:String, require: true, trim: true},
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    role: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'posts'}]
},{
    timestamps: true,
})

const User = mongoose.model('users', userSchema, 'users');

export default User;


