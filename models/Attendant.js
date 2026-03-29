import mongoose from "mongoose";

const LibraryAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "lease provide the library attendant name."]
    },
    staffID : {
        type: String,
        unique: true,
        required: [true, "lease provide the staff id."]
    }
}, { timestamps: true }
);

export default mongoose.model("Attendant", LibraryAttendantSchema);