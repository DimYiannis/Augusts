const User = require("../models/User");
const Sharedposts = require("../models/Apparel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");
const path = require("path");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  res.status(StatusCodes.OK).json({ user });

  console.log(req.signedCookies.token);
};

// update user's details
const updateUser = async (req, res) => {
  const { info, name } = req.body;
  const user = await User.findOne({ _id: req.user.userId });
  if (!info) {
    user.name = name;
  } else if (!name) {
    user.info = info;
  } else {
    user.info = info;
    user.name = name;
  }

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! " });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! password updated" });
};

// user's shared posts
const getUserPosts = async (req, res) => {
  const { id: userId } = req.params;
  console.log(req.params);

  try {
    const sharedposts = await Sharedposts.find({ user: userId });

    if (!sharedposts || sharedposts.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No shared posts found for user with ID: ${userId}`,
      });
    }

    res.status(StatusCodes.OK).json({ sharedposts, count: sharedposts.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getUserPosts,
};
