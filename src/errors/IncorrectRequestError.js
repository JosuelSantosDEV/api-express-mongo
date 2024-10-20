import BaseError from "./BaseError.js";

class IncorrectRequestError extends BaseError {
    constructor (message = "One or more reported datas is incorrect") {
        super(message,400);
    };

};

export default IncorrectRequestError;