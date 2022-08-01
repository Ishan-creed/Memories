import mongoose  from "mongoose";
import PostMessage from "../model/postMessage.js";

export const getPosts = async (req,res)=>{
   try{
        const postMessages =  await PostMessage.find();
           
        res.status(200).json(postMessages);
              
   }  catch(error){
         res.status(404).json({message: error.message});
   }
}

export const createPosts = async (req,res) =>{
  
     const post = req.body;
     const newPost = new PostMessage(post);

    try{
            await newPost.save();
            
            res.status(200).json(newPost);
    }  catch(error){
              res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) =>{
     const {id:_id} = req.params;
     const post = req.body;

     if(!mongoose.Types.ObjectId.isValid(id))  return res.send(404).send('No post with that id');

   const updatePost = await  PostMessage.findByIdAndUpdate(_id, post , {new : true});
     
   res.json(updatePost);
}

// export const deletePost = async (req,res) =>{
//      const {id} = req.params;

//      if(!mongoose.Types.ObjectId.isValid(id))  return res.send(404).send('No post with that id');

//      await postMessage.findByIdAndRemove(id);

//      res.json({message: 'post deleted successfully'})
// }