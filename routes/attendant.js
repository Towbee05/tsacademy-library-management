import express from "express"
import {
    createLibraryAttendant,
    getAllLibraryAttendant,
    getSingleLibraryAttendant,
    editLibraryAttendant,
    deleteLibraryAttendant
} from "../controller/attendant.js"

const router = express.Router();

router.route('/').post(createLibraryAttendant).get(getAllLibraryAttendant);
router.route('/:id').get(getSingleLibraryAttendant).patch(editLibraryAttendant).delete(deleteLibraryAttendant);

export default router;