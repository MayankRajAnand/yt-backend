import dotenv from "dotenv";
import mongoose from "mongoose";

import connectToDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectToDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Express unable to communicate with db", err);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed !!!");
  });
