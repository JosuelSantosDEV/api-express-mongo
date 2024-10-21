import {Author} from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";

class AuthorController {
    static async listAuthors (req, res, next) {
        try {
            const authors = Author.find({}).select("_id name gender nationality");

            if(!authors)
                next(new NotFoundError("There are no authors registered"));
            else {
                res.result = authors;
                next();
            }
        } catch (error) {
            next(error)
        }
    };

    static async getAuthorById (req, res, next) {
        try {
            const {id} = req.params;
            const authorFind = await Author.findById(id).populate("books", "_id title -author").exec();

            if(!authorFind)
                next(new NotFoundError("Author's id not found"));
            else
                res.status(200).json(authorFind);
        } catch (error) {
            next(error);
        }
    };

    static async createAuthor (req, res, next) {
        try {
            const newAuthor = await Author.create(req.body);
            res.status(201).json({
                message: "Author created sucessfull",
                author: newAuthor,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateAuthor (req, res, next) {
        try {
            const {id} = req.params;
            const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {new : true});
            if(!updatedAuthor)
                next(new NotFoundError("Author's id not found"))
            else
                res.status(200).json( {
                    message: "Author updated sucessfull",
                    updatedAuthor
                });
        } catch (error) {
            next(error);
        }
    };

    static async deleteAuthor (req, res, next) {
        try {
            const {id} = req.params;
            const deletedAuthor = await Author.findByIdAndDelete(id);
            if(!deletedAuthor)
                next(new NotFoundError("Author's id not found"));
            else
                res.status(200).json({
                    message: "Author deleted sucessfull",
                });
        } catch (error) {
            next(error);
        }
    };

};

export default AuthorController;