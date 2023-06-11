// step 17 : Create Authorization Middleware ----------------------------------------------------------------

/*See "MERN with NexJS Class Notes.md" 
Part 33.7 : Using Middleware functions
Part 36.1.5: Create Middleware
*/

import { User } from "../models/Users/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers?.authorization.split(" ")[1];

    try {
      //verify that we get the token from req.headers
      if (token) {
        //if so, then decode the token with the JWT_SECRET (private key)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get the user corresponding to the id stored in the decoded token
        const user = await User.findById(decoded?.id);

        //store the user into the .user custom property of req object. the user object will be available throughout the root where authMW is called, and as long as the token lives.

        req.user = user;

        next();
      }
    } catch (error) {
      //throw error in case the token is not verified
      res.json({ status: false, message: "Unauthorize" });
    }
  } else {
    //throw error in case the token is not found
    res.json({ status: false, message: "No token found" });
  }
};

//when called, this MW function restricts a route to the string passed as argument. Ex: restrictTo("admin") will restrict a route to admin
export const restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.json({
        status: false,
        message: "You are not authorized to perform this action",
      });
    } else {
      next();
    }
  };
};
