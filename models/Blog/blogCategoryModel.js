import mongoose from 'mongoose';
//es5: const mongoose = require('mongoose');

// step 5: Define blog Schema for the blog Model

const blogCategorySchema = new mongoose.Schema({
title: {
    required: true,
    type: String,
    unique: true,
},
slug:{
    required: true,
    type: String,
    unique: true,
}

},{timestamps:true})

// Compile model from schema and export it

export const blogCategoryModel = mongoose.model("BlogCategory",blogSchema)//