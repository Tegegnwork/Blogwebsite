const router = require("express").Router();
const Post = require("../model/post");
const jwt = require("jsonwebtoken");

// middleware to verify JWT and attach user info
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ error: "No token provided" });
  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    (err, user) => {
      if (err) return res.status(403).json({ error: "Token is not valid" });
      req.user = user; // { id, username, email }
      next();
    },
  );
}

router.post("/", verifyToken, async (req, res) => {
  // attach username from token instead of client
  const postData = { ...req.body, username: req.user.username };
  const newPost = new Post(postData);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    res.status(200).json(foundPost);
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

module.exports = router;
