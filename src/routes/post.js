const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post'); // import post model
const mongoose = require('mongoose');
 
// create new post
router.post('/',async(req,res)=>{
    const newPost = new Post(req.body); // we are using our post schema here
    try{
   const savePost =await newPost.save();
   res.status(201).json(savePost); // 201 is success code
    }catch(err){
        res.status(500).json(err);
    }

});

// update posts

router.put('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id); // find the post by id and update it with new data
            if(req.body.username === post.username){ // check if the username is same as the post username           
        try{ 
          const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true}); // find the post by id and update it with new data
            res.status(200).json(updatedPost); // 200 is success code
        }catch(err){
            res.status(500).json(err);
        }
            }else{
                res.status(400).json("You can only update your post!"); // if username is not same
            }
      
    }catch(err){
        res.status(500).json(err);
    }

});


// delete posts

router.delete('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id); // find the post by id and update it with new data
            if(req.body.username === post.username){ // check if the username is same as the post username           
        try{ 
         await Post.findByIdAndDelete(req.params.id); // find the post by id and update it with new data
            res.status(200).json("post has been deleted..."); // 200 is success code
        }catch(err){
            res.status(500).json(err);
        }
            }else{
                res.status(400).json("You can only delete your post!"); // if username is not same
            }
      
    }catch(err){
        res.status(500).json(err);
    }

});

// get posts
/*
router.get("/:id", async (req, res)=>{
    try{
        const posts = await Post.findById(req.params.id); // 
        res.status(200).json(posts); // 200 is success code
    }
    catch(err){
        res.status(500).json(err); // if error, send error message
    }
});*/

// get all posts
router.get("/", async(req,res)=>{
    const username = req.query.user; // get the username from the query
    const category = req.query.cat; 
  try{
    let posts;
    if(username){ // if username is present in the query
        posts = await Post.find({username : username}); // find all posts with the same username
 
    }else if(category){ // if category is present in the query
        posts = await Post.find({categories : {
            $in : [category], // find all posts with the same category
        }});
    } else{ // if no query is present
        posts = await Post.find(); // find all posts
    } 

    res.status(200).json(posts); // 200 is success code

  }catch(err){
        res.status(500).json(err); // if error, send error
  }
});

module.exports = router; // export the router so we can use it in our index.js file
