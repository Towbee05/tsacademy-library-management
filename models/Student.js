import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a student name"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provoide a student email"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        lower: true
    },
    studentID: {
        type: String,
        required: [true, "Please provide a student ID"],
        unique: true
    }
}, {
    timestamps: true
}
);

export default mongoose.model("Student", StudentSchema);