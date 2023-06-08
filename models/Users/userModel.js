// step 4 : Install and import dependencies ----------------------------------------------------------------

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/*es5 style import:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
*/

//Destructure SchemaTypes from Mongoose (MDN recommended way)
const {Schema, SchemaTypes, model} = mongoose;

// step 5: Define a schema for the userModel ----------------------------------------------------------------

const userSchema = new Schema(
    
{
  //defining Schema Types (Fields)
  userName: { 
    type: String, 
    required: (true, "Name is Required"),
    minlength: 3,
    maxlength: 30,
    trim: true},
  email: { 
    type: String, 
    required: (true, "Email is Required"),
    trim: true},
password: { 
    type: String, 
    required: (true, "Password is Required"),
},
  role : {
	  type: String,
	  default: "user"},
},
{timestamps:true}
);

//Password hashing, salting and matching verification function (method). See Mongoose Doc for bcrypt usage.

// .pre() method means it hashes and salts the pwd before saving it
//this run only when creating or saving a new user, not when updating or deleting a user
userSchema.pre("save",async function(next){
    //if password is not modified do not proceed to salt hashing, wejust pass the request to next operation with next()
    if(!this.isModified("password")){ 
        next();
    }
    //we use bcrypt for salting 
    const salt = await bcrypt.genSalt(10);
    //we use the salt for hashing
    this.password = await bcrypt.hash(this.password, salt); 
    //we pass the password to the next method (the bcrypt compare function)
    next()
})

userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    //we use bcrypt to compare the pwds. It takes the hashed password 'enteredPassword' as argument and compares it against the actual password of the user 'this.password' that we got from req.body
return await bcrypt.compare(enteredPassword,this.password)
    // the returned value is true or false
}

// step 6: Compile model from schema ----------------------------------------------------------------

const User = mongoose.model("User", userSchema);

// step 7: Export userModel----------------------------------------------------------------

export default User;
//module.exports = User;