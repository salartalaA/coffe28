const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/coffeShop_db");

const usersRouter = express.Router();
const blacklist = new Set();

// Register Route
usersRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure password is valid
    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Make sure password is valid
    const [rows, fields] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword] // Store hashed password
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login Route
usersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const [rows, fields] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userID: user.id },
      "c0ad0bbd89fcee1b595a972104326d90b5d99308917daac010fe006d0a6efe9e", // Fix syntax issue (complete string)
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Token Verification Middleware
// Modify verifyToken to check the blacklist
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied!" });
  }
  try {
    const splitToken = token.split(" ")[1];

    if (blacklist.has(splitToken)) {
      return res.status(401).json({ message: "Token has been blacklisted" });
    }

    const decoded = jwt.verify(
      splitToken,
      "c0ad0bbd89fcee1b595a972104326d90b5d99308917daac010fe006d0a6efe9e"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
}

// Protected Route
usersRouter.get("/userInfo", verifyToken, async (req, res) => {
  try {
    const userID = req.user.userID;
    const [rows, fields] = await db.execute(
      `SELECT * FROM users WHERE id = ?`,
      [userID]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ user: rows[0] });
  } catch (error) {
    console.error("Error fetching user Info:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Logout Route (Server-side with blacklist)
usersRouter.post("/logout", (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  const splitToken = token.split(" ")[1];
  blacklist.add(splitToken); // Add token to the blacklist

  res.json({ message: "Logged out successfully" });
});

usersRouter.get("/verifyToken", verifyToken, (req, res) => {
  // If the token is valid, the user is logged in.
  res.status(200).json({ message: "Token is valid" });
});

module.exports = usersRouter;
