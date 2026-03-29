import express from "express";
import {
    createStudent,
    getAllStudents,
    getSingleStudent,
    editStudent,
    deleteStudent
} from "../controller/student.js";

const router = express.Router();

router.route('/').post(createStudent).get(getAllStudents);
router.route('/:id').get(getSingleStudent).patch(editStudent).delete(deleteStudent);

export default router;