import { Blog } from "/workspaces/nodejs-mongodb/models/Blog/blogModel.js";

//createBlogPost --------------------------------
const postBlog = async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.json(post);
  } catch (error) {
    res.json({ error: error });
  }
};

//get Blog creator  --------------------------------

const getBlog = async (req, res) => {
  try {
    const post = await Blog.find().populate("postedBy"); //we populate the post variable with the user data in the postedBy field (which is is an object)
    res.json(post);
  } catch (error) {
    res.json({ error: error });
  }
};

//TODO :
//deleteBlogPost --------------------------------

//updateBlogPost --------------------------------

//getBlogPosts (all posts) --------------------------------

//getBlogPost (single use) --we can find him by any of the fields of the Model -----


export { postBlog, getBlog };

/* es6 style: 
module.exports = {
  postBlog,
  getBlog,
};
*/

