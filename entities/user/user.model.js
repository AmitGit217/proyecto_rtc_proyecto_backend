import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema({
    userName: {type:String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, default: 'user' },
    image: { type: String, required: false, trim: true },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts", 
    }]
},{
    timestamps: true,
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
});
const User = mongoose.model('users', userSchema, 'users');

export default User;


