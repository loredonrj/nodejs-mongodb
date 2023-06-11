//step 1 : Create Server --------------------------------
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//step 17 : Import Routers
import userRouter from "./routes/Users/userRoute.js";
import blogRouter from './routes/Blog/blogRoute.js';
import blogCategoryRouter from './routes/Blog/blogCategoryRoute.js';


app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-category", blogCategoryRouter);

//step 2 and 3 : Connect database and start server --------------------------------

(async () => {
  try {
    //codespace setup :
    //await mongoose.connect("mongodb://localhost:27017/gitsetup");
    //local VS Code setup :
    await mongoose.connect("mongodb://localhost:27017/mylocaldb");
    console.log("DB CONNECTED");
    app.listen(PORT);
    console.log(`Server is listening at //localhost:${PORT}`);
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
})();
