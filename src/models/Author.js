import mongoose from "mongoose";
import {Book} from "./index.js";

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true, trim: true},
    gender: { type: String, required: true , trim: true},
    nationality: { type: String, required: true , trim: true},
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true},
    toObject: {virtuals: true},
});

authorSchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "author",
    justOne: false,
});

authorSchema.pre("findOneAndDelete", async function(next) {
    const authorId = this.getQuery()._id;

    const book = await Book.findOne({ author: authorId });

    if (book) {
        const err = new Error("Cannot delete the author. There are books associated with this author.");
        next(err);
    } else {
        next();
    }
});

const ModelAuthor = mongoose.model("Author", authorSchema);

export default ModelAuthor;