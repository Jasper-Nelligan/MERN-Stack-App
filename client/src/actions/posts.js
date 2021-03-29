/*
 * The actions folder was created to be used with Redux. See ./reducers/index.js
 * for an explanation of Redux. An action can be more or less thought of an
 * object containing the data required for a setter function.
 * 
 * Each action calls a method in the ../api/index.js which updates the action
 * with new data.
 */

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

/*
 * Action creators, which are functions that return actions. An action
 * is just an object that has the type, and a payload.
 * 
 * The syntax 'async (dispatch)' is from redux thunk.
 * 
 * With the getPost() method, api.fetchPosts is called to fetch all the posts
 * in the database. The posts are stored in the 'data' variable, and then
 * this variable become the value for payload in the returned action. To
 * return an action, dispatch() is called.
 */
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
