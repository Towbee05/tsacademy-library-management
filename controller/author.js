import { StatusCodes } from 'http-status-codes';
import Author from '../models/Author.js';

const getAllAuthors = async (req, res) => {
    const authors = await Author.find({});
    return res.status(StatusCodes.OK).json({"data": authors});
};

const createNewAuthor = async (req, res) => {
    const { name, bio } = req.body;
    if (!name.trim()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: "Please provide an author name"
        });
    };
    if (!bio.trim()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: "Please provide an author bio"
        });
    };
    // Check if author exists
    const existingAuthor = await Author.findOne({name: name.toLowerCase()});
    if (existingAuthor) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: "Provided Author name exists in database"
        });
    }
    const author = await Author.create({name, bio});
    res.status(StatusCodes.CREATED).json({ data: author });
};

const getSingleAuthor = async (req, res) => {
    const { id } = req.params;
    const author = await Author.findOne({_id: id});
    if (!author) {
        return res.status(StatusCodes.NOT_FOUND).json({
            detail: `No Author with specified ID ${id} found`
        });
    };
    res.status(StatusCodes.OK).json({data: author});
};

const editAuthor = async (req, res) => {
    const { id } = req.params;
    const author = await Author.findOneAndUpdate({_id: id}, req.body, {returnDocument: "after"});
    if (!author) {
        return res.status(StatusCodes.NOT_FOUND).json({
            detail: `No Author with specified ID ${id} found`
        });
    };
    res.status(StatusCodes.OK).json({data: author});
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    const author = await Author.findOneAndDelete({_id: id});
    if (!author) {
        return res.status(StatusCodes.NOT_FOUND).json({
            detail: `No Author with specified ID ${id} found`
        });
    };
    res.status(StatusCodes.OK).json({
        "details" : author
    });
};

export {
    getAllAuthors,
    getSingleAuthor,
    createNewAuthor,
    editAuthor,
    deleteAuthor
};