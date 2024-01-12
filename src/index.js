import dotenv from "dotenv";
import mongoose from "mongoose";

import connectToDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectToDB();

//import express from "express";
//const app = express();

//(async () => {
//  try {
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//    app.on("error", (error) => {
//      console.log("ERR: ", error);
//      //DB is connected, but our express app is not able to able to communicate, so to handle that we have app.on("error")
//      throw error;
//    });

//    app.listen(process.env.PORT, () => {
//      console.log(`App is listening on port ${process.env.PORT}`);
//    });
//  } catch (err) {
//    console.error("Error", err);
//    throw err;
//  }
//})();
