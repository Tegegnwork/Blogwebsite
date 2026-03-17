const router = require("express").Router();
const Post = require("../model/post");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  // attach username from token instead of client
  const postData = { ...req.body, username: req.user.username };
  const newPost = new Post(postData);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      // updates only if the Post’s username field matches the currently logged-in user
      { _id: req.params.id, username: req.user.username }, // ownership enforced here
      { $set: req.body },
      { new: true },
    );
    if (!updatedPost) {
      return res.status(403).json({ error: "Not authorized" }); // detects authorization failure explicitly
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      username: req.user.username,
    });
    if (!deletedPost) return res.status(403).json({ error: "Not authorized" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    res.status(200).json(foundPost);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryName) {
      posts = await Post.find({ categories: { $in: [categoryName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
