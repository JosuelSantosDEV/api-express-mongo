import express from "express";
import AuthorController from "../controllers/authorController.js";
import paginateAndOrdenate from "../middlewares/paginateAndOrdenate.js";

const router = express.Router();

router
    .get("/authors", AuthorController.listAuthors, paginateAndOrdenate)
    .get("/authors/:id", AuthorController.getAuthorById)
    .post("/authors", AuthorController.createAuthor)
    .put("/authors/:id", AuthorController.updateAuthor)
    .delete("/authors/:id", AuthorController.deleteAuthor);


export default router;