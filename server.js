import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server listen in port ${PORT} - http://localhost:${PORT}`);
});