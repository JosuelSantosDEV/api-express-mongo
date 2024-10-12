import author from "../models/Author.js"

class AuthorController {
    static async listAuthors (req, res) {
        try {
            const authors = await author.find({}).select("_id name gender nationality");

            if(!authors) return res.status(404).json({
                error: `Authors not find`
            });

            res.status(200).json(
                {
                    authors: authors,
                    quantity: authors.length
                }
            );
        } catch (error) {
            res.status(500).json({
                message: `Get list authors failed: ${error}`
            });
        }
    };

    static async getAuthorById (req, res) {
        try {
            const {id} = req.params;
            const authorFind = await author.findById(id).populate("books", "_id title -author");

            if(!authorFind) return res.status(404).json({
                error: `Author not find`
            });

            res.status(200).json(authorFind);
        } catch (error) {
            res.status(500).json({
                message: `Get author failed: ${error}`
            });
        }
    };

    static async createAuthor (req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Author created sucessfull",
                author: newAuthor
            });
        } catch (error) {
            res.status(500).json({
                message: `Created author failed: ${error}`
            });
        }
    }

    static async updateAuthor (req, res) {
        try {
            const {id} = req.params;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json( {
                message: "Author updated sucessfull",
            });
        } catch (error) {
            res.status(500).json({
                message: `Updated author failed: ${error}`
            });
        }
    };

    static async deleteAuthor (req, res) {
        try {
            const {id} = req.params;
            await author.findByIdAndDelete(id);
            res.status(200).json({
                message: "Author deleted sucessfull"
            });
        } catch (error) {
            res.status(500).json({
                message: `Deleted author failed: ${error}`
            });
        }
    };

};

export default AuthorController;