import express from 'express';

const BlogCategoryRouter = express.Router();

import postCategory from '../../controllers/Blog/blogCategoryController';

BlogCategoryRouter.post("/category", postCategory);

export default BlogCategoryRouter;