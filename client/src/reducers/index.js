/*
 * The reducers folder was created to be used with Redux. Redux, at a high level,
 * is a state management tool that makes developers lives easier. A state is
 * data that may change. State determines what's displayed on the user interface.
 * 
 * What does state management mean? In general, there are three aspects of data
 * that are needed to be managed in an app:
 * 
 * 1. Fetching and storing data:
 *      With Redux, data is fetched once and stored in a central place,
 *      conveniently called “store.” The data is then ready for use anytime
 *      by any component. The store also serves as the single source of truth.
 *      Components always retrieve data from the store, not from anywhere else.
 * 2. Assigning data to UI elements:
 *      With typical React state handling, data would be passed down like a baton
 *      through components to the sub-component that needs it. Redux optimizes this
 *      and allows data to be passed down directly to the component that needs it.
 * 3. Changing data:
 *      Sometimes the logic of updating data in an app can be fairly complex.
 *      Redux allows us to divide and conquer. It provides a standard way to break
 *      data updating logic into small “reducers”. Those reducers work harmoniously
 *      together to complete a complex action.
 * 
 * The state of the app can be thought of all the data that the app holds. To make
 * changes to the state Redux must dispatch an action. An action can be thought
 * of as a setter function, but more so an object that holds data for the setter function.
 * Actions are implemented in ./actions/posts.js. Finally, to tie state and actions,
 * functions called reducers are written. Reducers are functions that take a state and
 * an action, and then based on the action type carries out some logic. Again comparing
 * these to setter functions, reducers would be where the function logic is carried out.
 * 
 * Redux core-concepts: https://redux.js.org/introduction/core-concepts
 */
import { combineReducers } from 'redux';

import posts from './posts';

/*
 * combineReducers() is a function that combines multiple reducers into a single
 * reducing function for use in the createStore() function, which is called in
 * ../index.js. Typically arguments to combineReducers come in key:value pairs,
 * but in this example since the key and the value are both the same (posts:posts),
 * just specifying it as posts is fine.
 */
export const reducers = combineReducers({ posts });
