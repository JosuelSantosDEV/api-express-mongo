import  express from "express";
import connectionInDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connectionDatabase = await connectionInDatabase();

connectionDatabase.on("error", (error)=> {
    console.log("Error in connection with database: ", error);
});

connectionDatabase.once("open", ()=> {
    console.log("Connected with database");
});

const app = express();

routes(app);


export default app;
