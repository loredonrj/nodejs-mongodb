import mongoose from 'mongoose';
//es5: const mongoose = require('mongoose');

// step 5: Define blog Schema for the blog Model

const blogSchema = new mongoose.Schema({
title: {
    required: true,
    type: String,
},
desc:{
    required: true,
    type: String,
},
postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',   
    required: true
}
    //the reference to the User Model is mandatory after the preceding 'type' field

},{timestamps:true})

// Compile model from schema and export it

export const Blog = mongoose.model("Blog",blogSchema)