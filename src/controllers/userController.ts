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

