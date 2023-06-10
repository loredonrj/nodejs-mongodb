import { blogCategoryModel } from "../models/Blog/blogCategoryModel.js";
import slugify from "slugify";

//create Blog Category --------------------------------
const postCategory = async (req, res) => {
    const { title } = req.body;
    try {
        if (title) {
            req.body.slug = slugify(title.toLowerCase());
            const category = await blogCategoryModel.create(req.body);
            res.status(200).json({ status: true, message: 'category created susscessfully', category });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: 'something went wrong' });

        
    }
}

//get Blog Categories (all categories) --------------------------------

const getBlogCategories = async (req, res) => {
    try {
      const categories = await blogCategoryModel.find().populate("title"); //we populate the post variable by any of the fields
      res.status(200).json({ status: true, message: 'Here is a list of all blog categories', categories });
    } catch (error) {
      res.status(400).json({ status: false, message: 'something went wrong' });
    }
  };

//get Blog Category (category of single post) --we can find it by any of the fields of the Model --

const findBlogCategory = async (req, res) => {
    try {
    const { title } = req.params;
      const category = await blogCategoryModel.findById(title);
      res.status(200).json({ status: true, message: 'blog category found', category });
    } catch (error) {
      res.status(400).json({ status: false, message: 'something went wrong' });
    }
  };

//update Blog Category --------------------------------

const updateBlogCategory = async (req, res) => {

    try {
    const { title } = req.params;
      //if slug and body exist
      if (title && req.body) {
        const updatedBlogCategory = await blogCategoryModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json({ status: true, message: 'blog found', updatedBlogCategory })
      }
      //update blog
    } catch (error) {
      res.status(400).json({ status: false, message: 'something went wrong' });
    }
  };



//delete Blog Category --------------------------------

const deleteBlogCategory = async (req, res) => {
    try {
    const { title } = req.params; //or req.body ?
      const deletedBlogCategory = await blogCategoryModel.findByIdAndDelete(title);
      res.status(200).json({ status: true, message: 'blog category deleted', deletedBlogCategory })
    } catch (error) {
      res.status(400).json({ status: false, message: 'something went wrong' });
    }
  };


export { postCategory, getBlogCategories, findBlogCategory, updateBlogCategory, deleteBlogCategory  };