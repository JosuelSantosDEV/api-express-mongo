import IncorrectRequestError from "./IncorrectRequestError.js";


class ValidateError extends IncorrectRequestError {
    constructor (error) {
        const errorMessage = Object.values(error.errors).map(err => err.message).join(" - ");
        super(`Data validation error: ${errorMessage}`);
    };

};

export default ValidateError;