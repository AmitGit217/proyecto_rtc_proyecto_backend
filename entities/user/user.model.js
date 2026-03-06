import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema({
    userName: {type:String, require: true, trim: true},
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true, trim: true },
    role: { type: String, require: true, trim: true },
    image: { type: String, require: false, trim: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'posts'}]
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


