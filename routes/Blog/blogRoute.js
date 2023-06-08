//See "MERN with NexJS Class Notes.md" Part 33.8 : ExpressJS/Routing

// Import dependencies

import express from "express";
//es5: const express = require("express");

// Create blogRouter object ----------------------------------------------------------------
const blogRouter = express.Router();

// Import blogController modules

import { postBlog, getBlog } from "../../controllers/Blog/blogController.js"
//es5: const { postBlog, getBlog } = require("../../controllers/Blog/blogController.js");

// Create Routes ----------------------------------------------------------------

//Routes that Write, Update and Delete data
blogRouter.post("/post", postBlog);
//router.delete("/:id", deleteBlog);
//router.put("/:id", updateBlog);

// Routes that Read data ----------------------------------------------------------------
blogRouter.get("/", getBlogs);
//router.get("/:id", getBlog);

// step : Export All Routes ----------------------------------------------------------------


export default blogRouter;
//es5: module.exports = blogRouter;