import express from "express";
import {
    createBook,
    getAllBooks,
    getSingleBook,
    editBook,
    deleteBook,
    returnBook,
    borrowBook
} from "../controller/book.js";

const router = express.Router();

router.route('').post(createBook).get(getAllBooks);
router.route('/:id').get(getSingleBook).patch(editBook).delete(deleteBook);
router.route("/:id/return").post(returnBook);
router.route("/:id/borrow").post(borrowBook);

export default router;