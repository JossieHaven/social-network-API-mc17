import { Router } from "express";
const router = Router();
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} from "../../controllers/userController.js";

// Route: /api/users
// - GET: Retrieve all users
// - POST: Create a new user

router.route("/").get(getAllUsers).post(createUser);

// Route: /api/users/:userId
// - GET: Retrieve a single user by ID, including their thoughts and friends
// - PUT: Update a user by ID
// - DELETE: Remove a user by ID
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId
// - POST: Add a friend to a user's friend list
// - DELETE: Remove a friend from a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export default router;
