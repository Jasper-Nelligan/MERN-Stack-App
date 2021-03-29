/*
 * index.js is where the React application is connected to the index.html file.
 * This file contains code on what to render and where to render it.
 */
import React from 'react';
import ReactDOM from 'react-dom';

/*
 * Initialize Redux. Provider keeps track of the store (store is a global state
 * where all the data is stored). Provider allows for global access of the store
 * so that anywhere from within the App can access it.
 */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
/*
 * Redux Thunk is middleware that allows you to return functions, rather than
 * just actions, within Redux. This allows for delayed actions, including
 * working with promises or asynchronous functions.
 */
import thunk from 'redux-thunk';
import { reducers } from './reducers';

/*
 * App.js has the root component of the react app because every view and
 * component are handled with hierarchy in React, where <App /> is the top
 * most component in the hierarchy.
 * 
 * App.js is a React Component, which is like a function that returns an HTML
 * element.
 */
import App from './App';
import './index.css';

/*
 * createStore() returns a Store object, which is the complete state of the app.
 * With this example, reducers are tied to the store, and Thunk middleware is
 * applied to the store so that it can handle asynchronous functions.
 */
const store = createStore(reducers, compose(applyMiddleware(thunk)));

/*
 * React renders HTML to the web page by using a function called ReactDOM.render().
 * This functions takes two arguments, HTML code and an HTML element. The purpose of
 * the function is to display the HTML code inside the HTML element.
 * 
 * In this example, the HTML in App.js is getting place in the <div> tag with id=root
 * in index.html. The <App /> syntax is used because App.js is a component.
 * 
 * The <Provider> tag surrounding store allows for all components to have access
 * to the store.
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
