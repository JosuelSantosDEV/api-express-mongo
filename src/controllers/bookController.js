import NotFoundError from "../errors/NotFoundError.js";
import Book from "../models/Book.js";

class BookController {
    static async listBooks (req, res, next) {
        try {
            const books = await Book.find({}).select("-createdAt -updatedAt").populate("author", "-_id name").exec();;

            if(!books) return res.status(404).json({
                error: "Books not find",
            });

            res.status(200).json(
                {
                    books: books,
                    quantity: books.length,
                },
            );
        } catch (error) {
            next(error);
        }
    };

    static async getBookById (req, res, next) {
        try {
            const {id} = req.params;
            const bookFind = await Book.findById(id).populate("author", "_id name").exec();;

            if(!bookFind)
                next(new NotFoundError("Book's id not found"));
            else
                res.status(200).json(bookFind);
        } catch (error) {
            next(error);
        }
    };

    static async createBook (req, res, next) {
        try {
            const newBook = await Book.create(req.body);
            res.status(201).json({
                message: "Book created sucessfull",
                book: newBook,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateBook (req, res, next) {
        try {
            const {id} = req.params;

            const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new : true});
            if(!updatedBook)
                next(new NotFoundError("Book's id not found"));
            else
                res.status(200).json( {
                    message: "Book updated sucessfull",
                    updatedBook
                });
        } catch (error) {
            next(error);
        }
    };

    static async deleteBook (req, res, next) {
        try {
            const {id} = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);
            if(!deletedBook)
                next(new NotFoundError("Book's id not found"));
            else
                res.status(200).json({
                    message: "Book deleted sucessfull",
                });
        } catch (error) {
            next(error);
        }
    };

};

export default BookController;