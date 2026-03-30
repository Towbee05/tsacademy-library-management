import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a book title"],
        lowercase: true,
        trim: true,
        unique: true
    },
    isbn: {
        type: String,
        required: [true, "Please enter book's ISBN"],
        unique: true,
        minlength: [13, "ISBN should be in the format 'x-xxx-xxxxx-x'"],
        maxlength: [17, "ISBN should be in the format '978-x-xxxx-xxxx-x' or '979-x-xxxx-xxxx-x'"],
        validate: {
            validator: function (v) {
                const isbn10 = /^\d{1}-\d{3}-\d{5}-\d{1}$/;
                const isbn13 = /^(978|979)-\d{1}-\d{4}-\d{4}-\d{1}$/;
                return isbn10.test(v) || isbn13.test(v);
            },
            message: "Please provide a correst ISBN format."
        }
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    }],
    status: {
        type: String,
        enum: {
            values: ["IN", "OUT"],
            message: "{VALUE} is not supported"
        },
        default: "IN"
    },
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendant"
    },
    returnDate: {
        type: Date
    }
}, { timestamps : true }
);

export default mongoose.model("Book", BookSchema);