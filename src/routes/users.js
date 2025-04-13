const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const post= require('../models/post');

const bcrypt = require('bcrypt');

// Update
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){     
        if(req.body.password){
            const salt = await bcrypt.genSalt(10); // generate salt for hashing password
            req.body.password = await bcrypt.hash(req.body.password,salt); // hash the password with salt
        }
   try{
       const updateUser = await User.findByIdAndUpdate(req.params.id,{ $set : req.body},{new:true}); // find the user by id and update it with new data
       // $set is used to update the data in the database
      res.status(200).json("Account has been updated"); // 200 is success code
   }catch(err){
       res.status(500).json(err);
   }
}else{
    res.status(400).json("You can only update your account!");
}
})



//  delete
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){     
     try{
       const  user = await User.findByIdAndDelete(req.params.id); // find the user by id and delete it
  
       try{
        await post.deleteMany({username : user.username}); // delete all posts of the user
       await User.findByIdAndDelete(req.params.id); // find the user by id and delete it
      res.status(200).json("Account has been deleted"); // 200 is success code
   }catch(err){
       res.status(500).json(err);
   }
}catch(err){
    res.status(400).json("User not found"); // if user not found
} 
}else{
    res.status(400).json("You can only delete your account!");
}
});




// get a user

router.get("/:id" , async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc; // destructuring the user object to remove password from it
        res.status(200).json(others); // 200 is success code
    }catch(err){
        res.status(500).json("User not found");
    }
})


module.exports = router; // export the router so we can use it in our index.js file
