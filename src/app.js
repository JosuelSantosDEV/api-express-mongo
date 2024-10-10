import  express from "express";
import "dotenv/config"
import connectionInDatabase from "./config/dbConnect.js";

const connectionDatabase = await connectionInDatabase();

connectionDatabase.on("error", (error)=> {
    console.log("Error in connection with database: ", error);
});

connectionDatabase.once("open", ()=> {
    console.log("Connected with database");
});

const app = express();

app.get("/", (req, res)=> {
    res.status(200).send("Api with Node.js");
});


export default app;
