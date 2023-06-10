//See "MERN with NexJS Class Notes.md" Part 33.8 : ExpressJS/Routing

// Import dependencies

import express from "express";

// Create blogRouter object ----------------------------------------------------------------
const blogRouter = express.Router();

// Import blogController modules

import { postBlog, getBlog } from "../../controllers/Blog/blogController.js"

// Create Routes ----------------------------------------------------------------

//Routes that Write, Update and Delete data

blogRouter.post("/post", postBlog);
blogRouter.get("", getBlog);
blogRouter.get("/:slug", findBlog);
blogRouter.get("/:slug", findBlogAuthor);
blogRouter.delete("/:slug", deleteBlog);
blogRouter.put("/:slug", updateBlog);

// Routes that Read data ----------------------------------------------------------------
blogRouter.get("/", getBlogs);
//blogRouter.("/:id", getBlog);

// step : Export All Routes ----------------------------------------------------------------

export default blogRouter;