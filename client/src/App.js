/*
 * App.js is the root component of the react app because every view and
 * component are handled with hierarchy in React, where <App /> is the top
 * most component in the hierarchy. App.js keeps track of the id for posts,
 * since a post's id is needed for both Posts.js and Form.js and App.js
 * is a parent to both of those. The use of id was set up to use just React
 * instead of Redux, which involves passing a state down several levels
 * to where the data is needed. This was just to show how data passing
 * is done without Redux.
 * 
 * App.js is a React Component, which is like a function that returns an HTML
 * element. Components can be either classes or functions, and must start with
 * a capital letter, which explains the capitalized file naming conventions.
 */

import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

/*
 * This brings in what is known as a redux hook, which allows actions to be
 * dispatched.
 */
import { useDispatch } from 'react-redux';

/*
 * Get the HTML for the Posts and Form components. 
 */
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import { getPosts } from './actions/posts';

/*
 * The styles.js file is located in the same folder as App.js, and so styles.js
 * contains the styles for App.js, which are imported under the name 'useStyles'.
 */
import useStyles from './styles';
// Import an image to be used in HTML
import memories from './images/memories.png';

const App = () => {
  /*
   * useState() is used here to set the state of the app. In this case the state
   * of the app keeps track of the next available post id. The '0' provided to
   * useState() means that currentId will start at 0. currentId is the state
   * itself, while setCurrentId is what is used to change the state. A typical way
   * to use this would be:
   * 
   * setCurrentId(prevId => prevId + 1)
   *
   * where prevId is the value of currentId.
   * 
   * currentId and setCurrentId are passed down to both forms and posts so that
   * the id of a post can be set and also accessed.
   */
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  /*
   * This brings in all styles from styles.js. For example, with the <AppBar>
   * tag below, it's className is set to classes.appBar, which is the styles
   * class implemented in styles.js.
   */
  const classes = useStyles();

  /*
   * useEffect() will perform a side-effect whenever the elements in the
   * passed in array are changed. This useEffect is used to refresh the posts
   * whenever a change to the posts are made. currentId is being watched since
   * when a post is updated, currentId is set back to 0 after it's done, and so
   * this change will cause useEffect to refresh the posts without having the
   * user refresh the entire page.
   */
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  /*
   * This is the HTML code that is returned to index.js, which is in turn
   * placed into index.html. This is where all the HTML code for the main page
   * is located.
   */
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              {/*
                * Posts is a React component located at ./components/Posts/Post/Post.js.
                * Same goes for the Form element below. Notice that setCurrentId is passed
                * down to Posts, and currentId is passed down to Forms. This is how data
                * is passed down within the app. In Forms.js and Posts.js, the paramaters
                * to each match the data that is passed down to them.
                */}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Create the Form element with the  */}
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
