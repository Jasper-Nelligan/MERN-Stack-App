/*
 * Contains code for the complete Form component. This includes all UI and data
 * handling before the form is submitted. The state of the form, which is layed
 * out with the useState() function associates a value with each text field.
 * Once the user inputs a value into that field, the state for that particular
 * text field is updated without messing with the rest of the state.
 * 
 * Once the form is submitted, an action is dispatched in the handleSubmit()
 * function. In order to dispatch the action, the createPost action must be
 * imported from ../../actions/posts must be imported. This createPosts action
 * will make a call to the server and will add the post to the database. This
 * action is passed to its corresponding reducer which will update the state
 * of the client app with this new post.
 */

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  // useState is an empty object with all fields set to an empty string
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    // Always need this line, not to get the refresh in the browser
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField
        name="creator"
        variant="outlined"
        label="Creator"
        fullWidth
        // value will be stored in the state field called postData.creator
        value={postData.creator}
        /*
         * Once the creator field is changed the forms state is changed. Using
         * this syntax with the triple dots, this specified that the rest of
         * the state should remain except for the value specified, which in
         * this case is the creator. The 'e' paramater is the event, which is
         * used to get the value in the textfield.
         */
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          /*
           * Once the creator field is changed the forms state is changed. Using
           * this syntax with the triple dots, this specified that the rest of
           * the state should remain except for the value specified, which in
           * this case is the creator.
           */
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth multiline rows={4} 
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
