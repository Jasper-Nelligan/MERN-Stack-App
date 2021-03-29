/*
 * A reducer is a function that accepts a state and an action, then, based
 * on the action type, does some logic. In then returns a changed state.
 * The state in this case is the list of posts. A state is not allows to be
 * null, which is why posts is initialized as an empty list in the arguments.
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
      /*
       * For creating a new post, the list of posts is first spread out, and then the new
       * post is added to the end. On the server side, the createPost() function was set to
       * return the newly created post. This single post was stored in action.payload in
       * ../actions/posts.js.
       */
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

