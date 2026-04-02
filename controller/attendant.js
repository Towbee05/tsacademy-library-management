import Attendant from "../models/Attendant.js";
import { StatusCodes } from "http-status-codes";

const createLibraryAttendant = async (req, res) => {
  const { name, staffID } = req.body;
  const attendant = await Attendant.create({
    name: name.trim().toLowerCase(),
    staffID,
  });
  res.status(StatusCodes.CREATED).json({
    data: attendant,
  });
};

const getAllLibraryAttendant = async (req, res) => {
  const attendant = await Attendant.find({});
  res.status(StatusCodes.OK).json({ data: attendant });
};
const getSingleLibraryAttendant = async (req, res) => {
  const { id } = req.params;

  const attendant = await Attendant.findOne({ _id: id });

  if (!attendant) {
    return res.status(StatusCodes.BAD_REQUEST).json({detail: `Attendant with ID: ${id} not found.`});
  };
  res.status(StatusCodes.OK).json({ data: attendant });
};
const editLibraryAttendant = async (req, res) => {
  const { id } = req.params;
  const data = {};
  const { name, staffID } = req.body;
  if (name) data.name = name;
  if (staffID) data.staffID = staffID;

  const attendant = await Attendant.findOneAndUpdate({_id: id}, data, {returnDocument: "after"});
  if (!attendant) {
    return res.status(StatusCodes.BAD_REQUEST).json({detail: `Attendant with ID: ${id} not found.`});
  };

  res.status(StatusCodes.CREATED).json({data: attendant});
};

const deleteLibraryAttendant = async (req, res) => {
  const { id } = req.params;
  const attendant = await Attendant.findOneAndDelete({_id: id});
  if (!attendant) {
    return res.status(StatusCodes.BAD_REQUEST).json({detail: `Attendant with ID: ${id} not found.`});
  };
  res.status(StatusCodes.NO_CONTENT).json({data: attendant});
};

export {
  createLibraryAttendant,
  getAllLibraryAttendant,
  getSingleLibraryAttendant,
  editLibraryAttendant,
  deleteLibraryAttendant,
};
