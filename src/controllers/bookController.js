import book from "../models/Book.js";

class BookController {
    static async listBooks (req, res) {
        try {
            const books = await book.find({});
            res.status(200).json(
                {
                    books: books,
                    quantity: books.length
                }
            );
        } catch (error) {
            res.status(500).json({
                message: `Get list books failed: ${error}`
            });
        }
    };

    static async getBookById (req, res) {
        try {
            const {id} = req.params;
            const bookFind = await book.findById(id);
            res.status(200).json(bookFind);
        } catch (error) {
            res.status(500).json({
                message: `Get book failed: ${error}`
            });
        }
    };

    static async createBook (req, res) {
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({
                message: "Book created sucessfull",
                book: newBook
            });
        } catch (error) {
            res.status(500).json({
                message: `Created book failed: ${error}`
            });
        }
    }

    static async updateBook (req, res) {
        try {
            const {id} = req.params;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json( {
                message: "Book updated sucessfull",
            });
        } catch (error) {
            res.status(500).json({
                message: `Updated book failed: ${error}`
            });
        }
    };

    static async deleteBook (req, res) {
        try {
            const {id} = req.params;
            await book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Book deleted sucessfull"
            });
        } catch (error) {
            res.status(500).json({
                message: `Deleted book failed: ${error}`
            });
        }
    };

};

export default BookController;