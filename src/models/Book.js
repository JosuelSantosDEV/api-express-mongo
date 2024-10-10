import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    title: {type: String, required: true, trim: true},
    publisher: { type: String, required: true , trim: true},
    price: { type: Number, required: true},
    genre: { type: String, required: true , trim: true}
}, {
    timestamps: true,
    versionKey: false
});

const book = mongoose.model("book", bookSchema);

export default book;