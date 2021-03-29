/*
 * Routing refers to determining how an application responds to a client request
 * to a particular endpoint, which is a URI (or path) and a specific HTTP request
 * method (GET, POST, and so on).
 * 
 * This file contains all routes for the server. The function for each route is
 * implemented in ./controllers/posts.js.
 */
import express from 'express';

/*
 * Get implemented functions for each route.
 */
import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

/*
 * Use the express.Router class to create modular, mountable route handlers.
 * A Router instance is a complete middleware and routing system; for this reason,
 * it is often referred to as a “mini-app”.
 */
const router = express.Router();

/*
 * In this example, the routing methods only have one callback functions, but
 * they can have many. With multiple callback functions, it is important to
 * provide next as an argument to the callback function and then call next()
 * within the body of the function to hand off control to the next callback.
 */
router.get('/', getPosts);
router.post('/', createPost);
/*
 * The :id syntax below is what is known as route paramaters. Route parameters
 * are named URL segments that are used to capture the values specified at their
 * position in the URL. The captured values are populated in the req.params object.
 * 
 * Ex:
 * 
 * Route path: /users/:userId/books/:bookId
 * Request URL: http://localhost:3000/users/34/books/8989
 * req.params: { "userId": "34", "bookId": "8989" }
 * 
 * With the below example, since we are working with a specific post, the post
 * id needs to be given so we can reference the post the user wants. If the id
 * was 123 for example, the request would be made to /posts/123, where the 123
 * could be extracted from the request params.
 */
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

// Exported so index.js can import this 
export default router;