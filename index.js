//step 1 : Create Server --------------------------------
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//step 17 : Import Routers
import BlogCategoryRouter from "/workspaces/nodejs-mongodb/routes/Blog/blogCategoryRoute.js";
import userRouter from "/workspaces/nodejs-mongodb/routes/Users/userRoute.js";
import blogRouter from "/workspaces/nodejs-mongodb/routes/Blog/blogRoute.js";


app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-category", BlogCategoryRouter);

//step 2 and 3 : Connect database and start server --------------------------------

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gitsetup");
    console.log("DB CONNECTED");

    const onListening = () => {
      console.log(`Server is listening at //localhost:${PORT}`);
    };

    app.listen(5000, onListening);
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
})();
