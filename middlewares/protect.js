// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// exports.protect = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authenticated",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_STRING);

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User no longer exists",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_STRING);

    // Find user & exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
