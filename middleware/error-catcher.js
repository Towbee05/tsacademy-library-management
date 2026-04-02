import mongoose from "mongoose"
import { StatusCodes } from "http-status-codes";

const errorCatcher = (err, req, res, next) => {
    // validate if error is due to invalid ObjectID
    
    // if (err instanceof err.TypeError){
    //     return res.status(StatusCodes.BAD_REQUEST).json({detail: err.message});
    // };
    if (err instanceof mongoose.Error.CastError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            detail: `Invalid ID provided: ${err.value}. ID should be a single string of 12 bytes or a string of 24 hex characters`
        })
    };
    // Validate if error is due to duplicate key
    if (err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        return res.status(StatusCodes.CONFLICT).json({
            detail: `${field} already exists`
        });
    }
    // Validate if error is due to validation error
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map(error => (
            {
                path: error.path, 
                value: error.value,
                message: error.message
            }
        ));
        return res.status(StatusCodes.BAD_REQUEST).json({detail: errors});
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({detail: "Internal server error. Please contact administrator"});
}

export default errorCatcher;