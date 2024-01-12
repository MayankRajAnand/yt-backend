import dotenv from "dotenv";
import mongoose from "mongoose";

import connectToDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectToDB();
