import  express from "express";
import connectionInDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import errorManipulate from "./middlewares/errorManipulate.js";
import manipulate404Error from "./middlewares/manipulate404Error.js";

const connectionDatabase = await connectionInDatabase();

connectionDatabase.on("error", (error)=> {
    console.log("Error in connection with database: ", error);
});

connectionDatabase.once("open", ()=> {
    console.log("Connected with database");
});

const app = express();

routes(app);

app.use(manipulate404Error)

app.use(errorManipulate);


export default app;
