import { StatusCodes } from "http-status-codes";

const createBook = (req, res) => {
    res.status(StatusCodes.CREATED).json({detail: "create book"});
};

const getAllBooks = (req, res) => {
    res.status(StatusCodes.OK).json({detail: "get all book"});
};
const getSingleBook = (req, res) => {
    res.status(StatusCodes.OK).json({detail: "get single book"});
};
const editBook = (req, res) => {
    res.status(StatusCodes.CREATED).json({detail: "edit book"});
};
const deleteBook = (req, res) => {
    res.status(StatusCodes.CREATED).json({detail: "delete book"});
};

export { 
    createBook,
    getAllBooks,
    getSingleBook,
    editBook,
    deleteBook
};

