import mongoose from "mongoose";
import IncorrectRequestError from "../errors/IncorrectRequestError.js";
import ValidationError from "../errors/ValidationError.js";
import BaseError from "../errors/BaseError.js";

const errorManipulate = (error, req, res, next) => {
    if(error instanceof mongoose.Error.CastError)
        new IncorrectRequestError().sendResponse(res);
    else if(error instanceof mongoose.Error.ValidationError)
        new ValidationError(error).sendResponse(res);
    else if(error instanceof BaseError)
        error.sendResponse(res);
    else
        new BaseError().sendResponse(res);
};

export default errorManipulate;