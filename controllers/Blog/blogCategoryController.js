import { blogCategoryModel } from "/workspaces/nodejs-mongodb/models/Blog/blogCategoryModel.js" ;
import slugify from "slugify";

//createBlogPostCategory --------------------------------

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

//getBlogPostsCategory (all posts) --------------------------------

//getBlogPostCategory (single category) --we can find him by any of the fields of the Model --

//deleteBlogPostCategory --------------------------------

//updateBlogPostCategory --------------------------------


export default postCategory;