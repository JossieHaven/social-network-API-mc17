import { User } from "../models/index.js";
import { Request, Response } from "express";


// Retrieves all users from the database

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);

    // If no users exist, return a 404 error
    if (!users) {
      res.status(404).json({ message: "No users to return at this time. Seed data maybe?" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Retrieves a single user by their ID, including their thoughts and friends

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select("-__v") 
      .populate("thoughts")
      .populate("friends"); 

    // If the user is not found, return a 404 error
    if (!user) {
      res.status(404).json({ message: "No user with that ID!" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Creates a new user in the database

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUserData = await User.create(req.body);
    res.json(newUserData);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Updates an existing user by their ID

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updateUserData = await User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $set: req.body }, 
      { new: true, runValidators: true } 
    );

    // If user is not found, return a 404 error
    if (!updateUserData) {
      res.status(404).json({ message: "No user with that ID!" });
    } else {
      res.json(updateUserData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Deletes a user by their ID

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUserData = await User.findOneAndDelete({
      _id: req.params.userId,
    });

    // If user is not found, return a 404 error
    if (!deleteUserData) {
      res.status(404).json({ message: "No user with that ID" });
    } else {
      res.json(deleteUserData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Adds a friend to a user's friends list

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Finds the user and adds the friend to their `friends` array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } }, // Prevents duplicate friend entries
      { new: true, runValidators: true }
    );

    // If user is not found, return a 404 error
    if (!updatedUser) {
      res.status(404).json({ message: "No user found with this ID!" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Removes a friend from a user's friends list

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;

    // Finds the user and removes the friend from their `friends` array
    const deletedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } }, // Removes the friend from the array
      { new: true }
    );

    // If user is not found, return a 404 error
    if (!deletedUser) {
      res.status(404).json({ message: "No user found with this ID!" });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
