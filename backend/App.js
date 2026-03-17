// backend branch tweak for PR
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
const authPost = require("./routes/posts");
const authCategory = require("./routes/categories");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI) //try to connect to MongoDB
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //if connection succeeds, then start the server
  })
  .catch((err) => {
    //if connection fails, log the error and terminate the process
    console.error("Database connection failed:", err);
    process.exit(1); //tells the operating system the process ended with an error
  });

// Middleware
app.use(helmet());
app.use(cors());
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Routes

app.get("/", (req, res) => {
  res.json({ message: "Blog API Server is running" });
});
app.use("/auth", authRoute);
app.use("/users", authUser);
app.use("/posts", authPost);
app.use("/categories", authCategory);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
