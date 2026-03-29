import Attendant from "../models/Attendant.js";
import { StatusCodes } from "http-status-codes";

const createLibraryAttendant = (req, res) => {
    res.status(StatusCodes.CREATED).json({});
};

const getAllLibraryAttendant = (req, res) => {
    res.status(StatusCodes.OK).json({});
};
const getSingleLibraryAttendant = (req, res) => {
    res.status(StatusCodes.OK).json({});
};
const editLibraryAttendant = (req, res) => {
    res.status(StatusCodes.CREATED).json({});
};
const deleteLibraryAttendant = (req, res) => {
    res.status(StatusCodes.NO_CONTENT).json({});
};