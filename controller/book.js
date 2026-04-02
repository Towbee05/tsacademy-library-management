import { StatusCodes } from "http-status-codes";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Student from "../models/Student.js";
import Attendant from "../models/Attendant.js";

const createBook = async (req, res, next) => {
  const { title, isbn, authors, status, thumbnail } = req.body;
  const data = {};
  if (title) data.title = title.trim().toLowerCase();
  if (isbn) data.isbn = isbn;
  if (authors) data.authors = authors;
  if (status) data.status = status;
  if (thumbnail) data.thumbnail = thumbnail;

  for (const id of authors) {
    const author = await Author.findOne({ _id: id });
    if (!author) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ detail: `Author with ID: ${id} not found` });
    }
  }
  const book = await Book.create({ ...data });
  res.status(StatusCodes.CREATED).json({ data: book });
};

const getAllBooks = async (req, res) => {
  // pagination values 
  // Add pagination
  let { page, limit, title, author } = req.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  // If user is searching 
  const searchData = {};
  if (title || author) {
    if (title) searchData.title = { $regex: title, $options: "i" } ;
    if (author) {
      const authors = await Author.find({name: {$regex: author, $options: "i"}});
      const mappedID = authors.map(author => author.id);
      searchData.authors = { $in: mappedID };
    };
  };

  const skipper = ( page - 1 ) * limit;
  let books = await Book.find(searchData).populate("authors").skip(skipper).limit(limit);
  
  res.status(StatusCodes.OK).json({ length: books.length, data: books });
};

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({ _id: id }).populate("authors");
  if (!book) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: `Book with ID: ${id} not found.`,
    });
  }
  
  if (book.status === "OUT") {
    await book.populate(["issuedBy", "borrowedBy"]);
  }

  res.status(StatusCodes.OK).json({ data: book });
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndUpdate({ _id: id }, req.body, {
    returnDocument: "after",
  });
  if (!book) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: `Book with ID: ${id} not found.`,
    });
  }
  res.status(StatusCodes.CREATED).json({ data: book });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: `Book with ID: ${id} not found.`,
    });
  }
  res.status(StatusCodes.OK).json({ data: book });
};

const borrowBook = async (req, res) => {
  const { borrowedBy, issuedBy, returnDate } = req.body;
  if (!borrowedBy)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: "Please provide the ID of the student borrowing." });
  if (!issuedBy)
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: "Please provide the ID of the library attendant issuing book.",
    });
  if (!returnDate)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: "Please specify the return date." });

  const student = await Student.findOne({ _id: borrowedBy });
  if (!student)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: `Student with ID: ${borrowedBy} not found.` });

  const attendant = await Attendant.findOne({ _id: issuedBy });
  if (!attendant)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: `Attendant with ID: ${issuedBy} not found.` });

  const { id } = req.params;
  const book = await Book.findOne({ _id: id });
  if (!book)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: `Book with ID: ${id} not found.` });
  if (book.status === "OUT")
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: "Specified book is already borrowed." });
  book.status = "OUT";
  book.borrowedBy = borrowedBy;
  book.issuedBy = issuedBy;
  book.returnDate = returnDate;

  await book.save();
  const data = await Book.findOne({ _id: book._id })
    .populate("issuedBy")
    .populate("borrowedBy")
    .populate("authors");

  res.status(StatusCodes.OK).json({ data: data });
};

const returnBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndUpdate(
    { _id: id },
    { status: "IN", $unset: { borrowedBy: "", issuedBy: "", returnDate: "" } },
    { returnDocument: "after" },
  ).populate("authors");
  if (!book) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: `Book with ID: ${id} not found.`,
    });
  }
  res.status(StatusCodes.OK).json({ data: book });
};

export {
  createBook,
  getAllBooks,
  getSingleBook,
  editBook,
  deleteBook,
  borrowBook,
  returnBook,
};
