import express from "express";
import {
    createNewAuthor,
    getSingleAuthor,
    editAuthor,
    deleteAuthor,
    getAllAuthors
} from '../controller/author.js';

const router = express.Router();

router.route('/').get(getAllAuthors).post(createNewAuthor);

router.route('/:id').get(getSingleAuthor).patch(editAuthor).delete(deleteAuthor);

export default router