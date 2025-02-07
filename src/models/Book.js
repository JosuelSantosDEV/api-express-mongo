import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    title: { type: String, required: true, trim: true },
    publisher: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
}, {
    timestamps: true,
    versionKey: false,
});

bookSchema.pre("save", async function (next) {
    const authorExists = await mongoose.model("Author").exists({ _id: this.author });
  
    if (!authorExists) {
      return next(new Error("Author not found."));
    }
    next();
});
  

const ModelBook = mongoose.model("Book", bookSchema);

export default ModelBook;