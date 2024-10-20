import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequestError from "../errors/IncorrectRequestError.js";
import ValidateError from "../errors/ValidateError.js";
import NotFoundError from "../errors/NotFoundError.js";

const errorManipulate = (error, req, res, next) => {
    if(error instanceof mongoose.Error.CastError)
        new IncorrectRequestError().sendResponse(res);
    else if(error instanceof mongoose.Error.ValidationError)
        new ValidateError(error).sendResponse(res);
    else if(error instanceof NotFoundError)
        error.sendResponse(res);
    else
        new BaseError().sendResponse(res);
};

export default errorManipulate;