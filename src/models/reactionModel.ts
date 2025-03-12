import { Schema, Types, Document } from "mongoose";


// Defines the Reaction interface for type safety

export interface IReaction extends Document {
  reactionId: Types.ObjectId; 
  reactionBody: string; 
  username: string; 
  createdAt: Date; 
}


// Defines the Reaction schema for MongoDB

const reactionSchema = new Schema<IReaction>(
  {
    // Unique identifier for the reaction, automatically generated
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    // Stores the reaction text, must be provided and have a max length of 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    // Stores the username of the user who posted the reaction
    username: {
      type: String,
      required: true,
    },

    // Timestamp for when the reaction was created, defaults to the current date/time
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true, // Enables getter functions when converting to JSON
    },
    id: false, // Prevents Mongoose from adding an `id` virtual field
  }
);


// This schema will be embedded within other documents like `Thought`

export default reactionSchema;
