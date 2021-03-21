/*
 * Axios is used to make api calls. This file basically defines the functions
 * that the api allows, along with their paramaters. Calling these functions
 * will make axios send a request to the specified url where These functions
 * are actually implemented in /server/controllers/posts.js.
 */
import axios from 'axios';

// url leading to backend route, which will return all posts
const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
