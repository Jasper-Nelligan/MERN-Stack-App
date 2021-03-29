/*
 * Express is a framework that runs with Node.js that allows developers to
 * create and maintain servers. Developers use Express to write server-side
 * logic in JavaScript for web and mobile applications.
 * 
 * With older versions of Node express would have to be imported like so:
 *    const express = require('express');
 * 
 * To enable the newer syntax using the import statement, the line:
 *    type: "module",
 * was added to package.json.
 * 
 */
import express from 'express';
/*
 * body-parser is used to process POST requests. A POST request is used to
 * send data to a server so it can create/update a resource. body-parser
 * extracts the entire body portion of an incoming request stream and exposes
 * it on req.body.
 * 
 * body-parser is an example of middleware. Express middleware are functions
 * that execute during the lifecycle of a request to the Express server. Each
 * middleware has access to the HTTP request and response for each route (or path)
 * it’s attached to. Middleware can either terminate the HTTP request or pass it
 * on to another middleware function. Middleware is set up using app.use() below.
 */
import bodyParser from 'body-parser';
/*
 * Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 * It manages relationships between data, provides schema validation, and is
 * used to translate between objects in code and the representation of those
 * objects in MongoDB.
 */
import mongoose from 'mongoose';
/*
 * CORS is a mechanism to allow or restrict requested resources on a web server
 * depending on where the HTTP request was initiated. This policy is used to
 * secure a certain web server from access by other websites or domains. CORS is
 * really useful when you're offering a public API and would like to control
 * the access to certain resources and how people use them.
 * 
 * For example, if you are currently on http://example.com/page1 and you are referring an image
 * from http://image.com/myimage.jpg you won't be able to fetch that image unless
 * http://image.com allows cross-origin sharing with http://example.com. By default
 * requests from any other origins will be restricted by the browser.
 * 
 * In this example, the frontend application was running on http://localhost:3000.
 * Meanwhile, the server was running on http://localhost:5000. Because of this,
 * CORS is needed between server and client so they can communicate.
 */
import cors from 'cors';
/*
 * User a dotenv to store sensitive information. This file should be on 
 * .gitignore.
 */
import dotenv from 'dotenv';
/*
 * A route is a section of Express code that associates an HTTP verb
 * (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is
 * called to handle that pattern.
 * 
 * 'postRoutes' is the variable name that will be used throughout the rest of
 * this file for referring to ./routes/posts.js. 
 */
import postRoutes from './routes/posts.js';

// Every express application must first initialize the app
const app = express();
// Before using the doten file, use .config()
dotenv.config();


/*
 * To set up a middleware, app.use() is invoked for every middleware layer
 * that you want to add. Middleware can be generic to all paths, or triggered
 * only on specific path(s) your server handles. In this example, body-parser
 * and cors is set up so that they handle all paths.
 */
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
/*
 * Below is an example of middleware that is specific to a route. postRoutes is
 * the file which handles all other routes. All posts data is handled at
 * localhost:5000/posts, so in this case the '/posts' argument is the staring
 * path for all routes inside posts.js. For the client side.
 * 
 * On the client side, inside api/index.js, the URL for api requests is specified
 * as localhost:5000/posts.
 */
app.use('/posts', postRoutes);

const PORT = process.env.PORT;

/*
 * Connect to the MongoDB using mongoose. mongoose.connect() returns a promise,
 * which is handled by .then() if the connection is succesful, and .catch()
 * otherwise. If then() is called, app.listen() is called, which makes the server
 * start to listen on port 5000. Once the app starts to listen, the console.log()
 * function is called.
 */
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

/*
 * This line, along with the useNewUrlParser and useUnifiedTopology options
 * above makes it so that warnings aren't put onto the console regarding
 * the database.
 */
mongoose.set('useFindAndModify', false);