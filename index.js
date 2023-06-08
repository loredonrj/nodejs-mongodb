//step 1 : Create Server --------------------------------
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

import BlogCategoryRouter from "./routes/Blog/blogCategoryRoute";
//step 17 : Import userRouter
import userRouter from "./routes/Users/userRoute";

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
