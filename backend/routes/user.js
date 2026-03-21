const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          ...(req.body.password && { password: req.body.password }), // include password only if provided
        },
      },
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    return res.status(403).json({ error: "Not authorized" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return res.status(404).json({ error: "User not found" }); // explicit null check, Immediately ends the handler and returns a proper not-found response
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
