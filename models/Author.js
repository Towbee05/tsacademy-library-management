import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the author name"],
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    },
    bio: {
        type: String,
        maxlength: [1000, "Bio entry is too long"]
    },
}, {timestamps: true});

export default mongoose.model("Author", AuthorSchema);