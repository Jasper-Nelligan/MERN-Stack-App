/*
 * Axios is used to make api calls. This file basically defines the functions
 * that the api allows, along with their paramaters. Calling these functions
 * will make axios send a request to the specified url where these functions
 * are actually implemented in /server/controllers/posts.js.
 * 
 * The functions defined below are called from the ./actions/posts.js file.
 */
import axios from 'axios';

/*
 * The URL leading to the backend route. All api calls related to posts are
 * set up to be handled at the localhost5000/posts.
 */
const url = 'https://localhost:5000/posts';

/*
 * Each function is given a name and is exported for the rest of the client
 * side to use.
 * 
 * For fetchPosts, axios sends a get request to localhost:5000/posts. In the
 * /routes/posts.js file, it was specified that a get request on the homepage
 * would lead to the getPosts() method.
 * 
 * For deletePost, the id is specified at the end of the URL which will be
 * extracted from the URL paramaters in /routes/posts.js.
 */
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
