import { Blog } from "../../models/Blog/blogModel.js";

//createBlogPost --------------------------------
const postBlog = async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.json(post);
  } catch (error) {
    res.json({ error: error });
  }
};

//getBlog (all blogs) --------------------------------

const getBlog = async (req, res) => {
  try {
    const post = await Blog.find().populate("postedBy"); //we populate the post variable with the user data in the postedBy field (which is is an object)
    res.status(200).json({ status: true, message: 'Here is a list of all blogs', post });
  } catch (error) {
    res.status(400).json({ status: false, message: 'something went wrong' });
  }
};

//findBlog by Slug (HOMEWORK) --------------------------------

const findBlog = async (req, res) => {
  try {
  const { slug } = req.params; //or req.body ?
    const foundBlog = await Blog.findById(slug);
    res.status(200).json({ status: true, message: 'blog found', foundBlog });
  } catch (error) {
    res.status(400).json({ status: false, message: 'something went wrong' });
  }
};

//findBlog by Author (HOMEWORK) --------------------------------

const findBlogAuthor = async (req, res) => {
  try {
  const { postedBy } = req.params; //or req.body ?
    const blogs = await Blog.findbyId(postedBy);
    res.status(200).json({ status: true, message: 'here are the blogs of this author', blogs });
  } catch (error) {
    res.status(400).json({ status: false, message: 'something went wrong' });
  }
};

//deleteBlog (HOMEWORK) --------------------------------

const deleteBlog = async (req, res) => {
  try {
  const { slug } = req.params; //or req.body ?
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: 'blog found', deletedBlog })
  } catch (error) {
    res.status(400).json({ status: false, message: 'something went wrong' });
  }
};

//updateBlog (HOMEWORK) --------------------------------

const updateBlog = async (req, res) => {

  try {
  const { slug } = req.params; //or req.body ?
    //if slug and body exist
    if (slug && req.body) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ status: true, message: 'blog found', updatedBlog })
    }
    //update blog
  } catch (error) {
    res.status(400).json({ status: false, message: 'something went wrong' });
  }
};


//export 

export { postBlog, getBlog, findBlog, findBlogAuthor, deleteBlog, updateBlog};


