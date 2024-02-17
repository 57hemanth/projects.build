import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, 'Password must be at least 8 characters long'],
        maxLength: [128, 'Password must be less than 128 characters long']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
  });

const User = mongoose.model("User", userSchema);

export default User;