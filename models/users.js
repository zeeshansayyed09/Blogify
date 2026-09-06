const { Schema, model } = require('mongoose')
const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../service/authenticaion');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    userProfileImage: {
        type: String,
        default: '/images/useravatar.avif'
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString('hex');
    const hashPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt;
    user.password = hashPassword;

    next
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password){
    const user = await this.findOne({ email })
    if(!user) throw new Error('User not found')

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');
    if(hashPassword !== userProvidedHash){
        throw new Error('Incorrect password!')
    }

    const token = createTokenForUser(user);
    return token;
})
const User = model('user', userSchema)

module.exports = User;