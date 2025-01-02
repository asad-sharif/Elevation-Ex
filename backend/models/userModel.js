import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'User name is required according to schema'] },
    email: { type: String, required: [true, 'User email is required according to schema'], unique: true },
    password: { type: String, required: [true, 'User password is required according to schema'] },
    role:{type:String, default: 'user'}
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.statics.countAll = async function () {
    return await this.countDocuments()
}

export const User = mongoose.model('User', userSchema)  