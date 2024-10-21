
import NotFoundError from "../errors/NotFoundError.js";
import { Book, Author } from "../models/index.js";

class BookController {
    static async listBooks (req, res, next) {
        try {

            const books = Book.find().select("-createdAt -updatedAt").populate("author", "-_id name");

            if(!books)
                next(new NotFoundError("There are no books registered"));
            else{
                res.result = books;
                next();
            }

        } catch (error) {
            next(error);
        }
    };

    static async getBookById (req, res, next) {
        try {
            const {id} = req.params;
            const bookFound = await Book.findById(id).populate("author", "_id name").exec();

            if(!bookFind)
                next(new NotFoundError("Book's id not found"));
            else
                res.status(200).json(bookFind);
        } catch (error) {
            next(error);
        }
    };

    static async searchBooks (req, res, next) {
        try {
            const { publisher, title, author, genre } = req.query;

            let search = {};

            if(publisher) search.publisher = {$regex: publisher, $options: "i"};
            if(title) search.title = {$regex: title, $options: "i"};
            if(genre) search.genre = {$regex: genre, $options: "i"};
            if(author) {
                const authorFound = await Author.findOne({ name : author});
                if(authorFound) search.author = authorFound._id;
                else search = null;
            };

            if(search){

                const booksFound = Book.find(search).select("-createdAt -updatedAt").populate("author", "-_id name");
    
                if(!booksFound)
                    next(new NotFoundError("Book's not found"));
                else
                    res.result = booksFound;
                    next()
            }
            else
                res.status(200).json({
                    books: [],
                    size: 0
                });

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