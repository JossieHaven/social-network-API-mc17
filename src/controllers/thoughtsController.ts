import { Request, Response } from "express";
import { User, Thought } from "../models/index.js";


 // Retrieves all thoughts from the database.

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);

    if (!thoughts) {
      res.status(404).json({
        message: "No thoughts to return at this time... try running seed data?",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Retrieves a single thought by its ID.

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      res.status(404).json({ message: "No thought with that ID" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Creates a new thought and associates it with a user.
 // If the user does not exist, the thought is deleted.

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThoughtData = await Thought.create(req.body);

    // Find user and add the thought ID to their thoughts array
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: newThoughtData._id } },
      { new: true }
    );

    if (!updatedUser) {
      // Delete thought if user does not exist
      await Thought.findByIdAndDelete(newThoughtData._id);
      res.status(404).json({
        message:
          "No user found for this username! Thought has been deleted. Please try a new thought!",
      });
    } else {
      res.json(newThoughtData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Updates an existing thought by its ID.
 
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updateThoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updateThoughtData) {
      res.status(404).json({ message: "No thought related to that ID" });
    } else {
      res.json(updateThoughtData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Deletes a thought by its ID.

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = req.params.thoughtId;

    const deleteThoughtData = await Thought.findOneAndDelete({ _id: thought });

    if (!deleteThoughtData) {
      res.status(404).json({ message: "No thought with that ID" });
    } else {
      res.json(deleteThoughtData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Adds a reaction to a thought's reactions array.

export const addReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const newReaction = {
      reactionBody,
      username,
    };

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: newReaction } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with that ID!" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


 // Deletes a reaction from a thought by its reaction ID.
 
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with that ID!" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
