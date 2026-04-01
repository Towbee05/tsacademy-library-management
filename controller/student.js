import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Student from "../models/Student.js";

const createStudent = async (req, res) => {
    const { name, email, studentID } = req.body;
    const student = await Student.create({name: name.trim().toLowerCase(), email, studentID});
    res.status(StatusCodes.CREATED).json({
        data: student
    })
};

const getAllStudents = async (req, res) => {
    const students = await Student.find({});
    res.status(StatusCodes.OK).json({data: students});
};
const getSingleStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({detail: "Please provide id to fetch"})
    }
    const student = await Student.findOne({_id: id});
    // Check ID Validity;
    if (!student){
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: `ID "${id}" does not exist` 
        });
    }
    res.status(StatusCodes.OK).json({data: student});
};
const editStudent = async (req, res) => {
    const { id } = req.params;
    // Check ID Validity;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({detail: "Please provide id to fetch"})
    }
    const student = await Student.findOneAndUpdate({_id: id}, req.body, {returnDocument: "after"});
    if (!student){
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: `ID "${id}" does not exist` 
        });
    }
    res.status(StatusCodes.CREATED).json({data: student});
};
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({detail: "Please provide id to fetch"})
    }
    const student = await Student.findOneAndDelete({_id: id});
    if (!student){
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: `ID "${id}" does not exist` 
        });
    }
    res.status(StatusCodes.NO_CONTENT).json({data: student});
};

export {
    createStudent,
    getAllStudents,
    getSingleStudent,
    editStudent,
    deleteStudent
};