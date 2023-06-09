import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from  "./config/database.js";
import router from './routes/index.js';
dotenv.config();
const app = express();

try{
    await db.authenticate();
    console.log('Database Connected');
} catch (error){
    console.error(error);
}

const PORT = process.env.PORT || 8000;


app.use(cors({ credentials:true, origin:'http://localhost:8000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
