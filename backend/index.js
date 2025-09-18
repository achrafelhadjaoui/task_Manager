import express from "express";
import cors from "cors";
import 'dotenv/config'
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {console.log("Server running at http://localhost:" + PORT)});

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
  }));
app.use(express.json({extended: true,limit:"10mb"}));
app.use("/api", router);