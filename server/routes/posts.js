/*
 * Contains different routes and calls their corresponding functions.
 * Functions are implemented in ../controllers/posts.js
 */
import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

/*
 * When a user visits (gets) '/' or homepage, the callback function specified in the
 * second argument is run.
 */
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
/*
 * 'patch' is for updating existing documents. The id of the post is needed
 * to increase it's like count. If the id was 123 for example, the request
 * would be made to /posts/123, where the 123 could be extracted from the 
 * request params.
 */
router.patch('/:id/likePost', likePost);

// Exported so index.js can import this 
export default router;