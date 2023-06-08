//See "MERN with NexJS Class Notes.md" Part 33.8 : ExpressJS/Routing

//step 12: Import dependencies

import express from "express";
//es5: const express = require("express");


//step 13: Import userController modules

import {createUser, getUsers, getUser, deleteUser, updateUser,loginUser
} from "../../controllers/Users/userController.js"
  
/* ES5 style import:
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../../controllers/Users/userController.js");
*/

import {authMiddleware, restrictTo} from "../../middlewares/authMiddleware.js";

/* ES5 style import: 
const {
  authMiddleware,
  restrictTo,
} = require("../../middlewares/authMiddleware.js");
*/

//step 14 : Create userRouter object ----------------------------------------------------------------
const userRouter = express.Router();

// step 15 : Create Routes ----------------------------------------------------------------

//Routes that Write, Update and Delete data
userRouter.post("/register", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/update-user", updateUser);
userRouter.post("/login", loginUser);
userRouter.put(
  "/update-password",
  authMiddleware,
  restrictTo(["admin"]),
  updateUser
);
//["admin"] must be an array b/c we defined the restrictTo using destructuring (...roles)

// Routes that Read data ----------------------------------------------------------------
userRouter.get("/all-users", authMiddleware, getUsers);
userRouter.get("/:id", getUser);

// step 16 : Export All Routes ----------------------------------------------------------------

export default userRouter;
//es5: module.exports = userRouter;

