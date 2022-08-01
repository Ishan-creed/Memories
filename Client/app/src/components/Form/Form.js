import React, { useState , useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost , updatePost} from '../../actions/posts';
import { useSelector } from "react-redux";



const Form = ({ currentId, setCurrentId }) => {


    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        creator: '', title: '', tags: '', selectedFile: ''
    });

    const post = useSelector((state) => currentId? state.posts.find((p)=>p._id === currentId): null);
    useEffect(() => {
         if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {

            dispatch(createPost(postData));


        }
    }
    const clear = () => {
           setCurrentId(null);
           setPostData({  creator: '', title: '', tags: '', selectedFile: ''});
    }

    const classes = useStyles();
    return (
        <Paper className={classes.paper} style = {{ boxShadow: '1px 3px 1px' }}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a new Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" style = {{backgroundColor: 'white'}}fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title"style = {{backgroundColor  : "white"}} fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" style = {{backgroundColor  : "white"}}fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags"style = {{backgroundColor  : "white"}} fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type = "file"
                        multiple = {false}
                        onDone = {({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" style={{backgroundColor: "	#00FF00"}} size="large" type="submit" fullWidth>Submit</Button>
                <Button className="Button" variant="contained" color="secondary"  size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );


};


export default Form;