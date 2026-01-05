const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//ping
exports.ping = (req, res) => {
  res.send("server is working well");
  // return;
};
//registering a user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "missing details in register form",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `${email} already exists. login instead`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_STRING, {
      expiresIn: "1d",
    });

    // environment-safe cookie config
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id, //head ache _
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error occured " + err.message,
    });
  }
};

//login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }

    // Select password explicitly because select: false in model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET_STRING, {
      expiresIn: "1d",
    });

    // Environment-safe cookie config
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response (do NOT send password)
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error occurred: " + err.message,
    });
  }
};

//getting user by id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params._id;
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "no user with id " + id + " found!",
      });
    }
    //if the user exists
    res.status(200).json({
      success: true,
      message: "user found.",
      user: foundUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error occurred: " + err.message,
    });
  }
};

//logout
exports.logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0), // set cookie expiry to past date
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error occurred: " + err.message,
    });
  }
};
