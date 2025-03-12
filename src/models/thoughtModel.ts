import { Schema, model, Document, Types } from "mongoose";
import reactionSchema, { IReaction } from "./reactionModel.js"; 

// Define the Thought interface to enforce TypeScript type checking
interface IThought extends Document {
  thoughtText: string; // Stores the content of the thought
  createdAt: Date; // Stores the timestamp of when the thought was created
  username: string; // Stores the username of the user who posted the thought
  reactions: Types.DocumentArray<IReaction>; // Array of reactions (subdocuments)
  reactionCount: number; // Virtual property that returns the number of reactions
}

// Define the Thought schema for MongoDB
const thoughtSchema = new Schema<IThought>(
  {
    // The main content of the thought
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Timestamp when the thought was created (defaults to the current time)
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // The username of the user who created the thought
    username: {
      type: String,
      required: true,
      ref: "User", // References the User model
    },
    // Array of embedded reactions (subdocuments)
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true, // Enables virtual properties to be included in JSON output
    },
    id: false, // Prevents Mongoose from adding an `id` virtual field
  }
);

// Define a virtual property `reactionCount` to calculate the number of reactions dynamically
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize and export the Thought model
const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
