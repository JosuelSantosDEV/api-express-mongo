import NotFoundError from "../errors/NotFoundError.js";

const manipulate404Error = (req, res, next) => {
    const error404 = new NotFoundError();
    next(error404);
};

export default manipulate404Error;