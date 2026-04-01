import Attendant from "../models/Attendant.js";
import { StatusCodes } from "http-status-codes";

const createLibraryAttendant = async (req, res) => {
    const { name, staffID } = req.body;
    const attendant = await Attendant.create({name: name.trim().toLowerCase(), staffID});
    res.status(StatusCodes.CREATED).json({
        data: attendant
    })
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

export {
    createLibraryAttendant,
    getAllLibraryAttendant,
    getSingleLibraryAttendant,
    editLibraryAttendant,
    deleteLibraryAttendant
};