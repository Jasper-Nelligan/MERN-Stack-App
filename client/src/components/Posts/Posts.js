import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
/*
 * Selectors is used to fetch data from the global redux store.
 */
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  /*
   * useSelector() is another React hook. The paramater for this, 'state'
   * is what gives this file access the global redux store. In this example,
   * all posts in the redux store are stored in a variable called posts, and
   * then the posts variable data is displayed in the HTML returned below.
   * 
   * How do we know that the data in the state is called posts? This is because
   * in reducers/index.js, all reducers defined in reducers/posts.js were put
   * under a collective name 'posts', which was passed to the combineReducers()
   * function.
   */
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    /*
     * If there is no posts, show a loading spinner (CircularProgress). Else,
     * create a grid from the loaded posts.
     */
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
