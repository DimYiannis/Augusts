const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createlike,
  getAllLikes,
  deleteLike,
} = require("../controllers/likesController");

router
.route('/')
.post(authenticateUser, createlike)
.get(authenticateUser,getAllLikes )

router
.route('/:id')
.delete(authenticateUser,  deleteLike)

module.exports = router;