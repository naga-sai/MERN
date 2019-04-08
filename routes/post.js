const express = require("express");
const Router = express.Router();
const { post } = require("../models/post");

// Create a Post
Router.post("/savePost", async function(req, res) {
  //console.log("create post Routes");
  const payload = { ...req.body, createdBy: req.decoded.email };
  const postDoc = post(payload);
  try {
    const result = await postDoc.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Update Likes
Router.put("/updateLikes/:id", async function(req, res) {
  // console.log("update likes");
  const id = req.params.id;
  const postDoc = await post.findOneAndUpdate(
    { _id: id },
    { $addToSet: { likes: req.decoded.email } }
  );
  try {
    const result = await postDoc.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

// Update Comments
Router.post("/updatePost/:id", async function(req, res) {
  try {
    const id = req.params.id;
    console.log(req.body);
    const result = await post.findOneAndUpdate(
      { _id: id },
      { $push: {comments:{text:req.body.text, author: req.decoded.email} }},
      {
        new:true
      }
    );
    res.send(result);
  } catch (ex) {
    console.log("Exception");
    res.send(ex);
  }
});

// Get All Posts
Router.get("/getAllPosts", async function(req, res) {
  try {
    const result = await post.find();
    res.send({ result });
  } catch (ex) {
    res.send(ex.message);
  }
});

// get Post 
Router.get("/getPost/:id", async function(req, res) {
  try {
    const id = req.params.id;
    const result = await post.findOne({ _id: id });
    res.send({ result });
  } catch (ex) {
    res.send(ex.message);
  }
});

// Delete Post
Router.delete("/delete/:id", async function(req, res) {
  try {
    const id = req.params.id;
    const result = await post.remove({ _id: id });
    res.send(result);
  } catch (ex) {
    res.send(ex.post);
  }
});

module.exports = Router;
