import mongoose from "mongoose";
import author from "../models/Author.js";
import NotFoundError from "../errors/NotFoundError.js";

class AuthorController {
    static async listAuthors (req, res, next) {
        try {
            const authors = await author.find({}).select("_id name gender nationality").exec();

            if(!authors) return res.status(404).json({
                error: "Authors not found",
            });

            res.status(200).json(
                {
                    authors: authors,
                    quantity: authors.length,
                },
            );
        } catch (error) {
            next(error)
        }
    };

    static async getAuthorById (req, res, next) {
        try {
            const {id} = req.params;
            const authorFind = await author.findById(id).populate("books", "_id title -author").exec();

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
            const newAuthor = await author.create(req.body);
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
            const updatedAuthor = await author.findByIdAndUpdate(id, req.body, {new : true});
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
            const deletedAuthor = await author.findByIdAndDelete(id);
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