import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('users', userSchema, 'users');

export default User;


