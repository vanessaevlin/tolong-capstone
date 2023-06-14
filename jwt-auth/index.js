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

const PORT = process.env.PORT || 'Isi port anda';


app.use(cors({ credentials:true, origin:'Isi https anda'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });