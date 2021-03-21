/*
 * A reducer is a function that accepts a state and an action, then, based
 * on the action type, does some logic.
 */

/*
 * 'posts' variable cannot be null, which is why it's specified as an empty
 * array.
 */
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      /* 
       * The map function takes in an array, makes a change to each item, and
       * returns a new changed array.
       */
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

