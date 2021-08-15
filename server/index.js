import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import {
  homeRouter, CompileRouter
} from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Dbconnection
process.env.NODE_ENV === "test" ? connectLocalDB() : connectDB();

// api endpoints
app.use(homeRouter);
app.use("/",CompileRouter);


app.listen(5000, () => {
  console.log(`Server running on ${environment} mode at port ${PORT} `);
});


