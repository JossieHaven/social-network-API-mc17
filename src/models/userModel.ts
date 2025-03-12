import { Schema, model, Document, ObjectId } from "mongoose";


// Defines the User interface to enforce type safety

interface IUser extends Document {
    username: string;  
    email: string;     
    thoughts: ObjectId[]; 
    friends: ObjectId[];   
    friendCount: number;   
}


// Defines the User schema for MongoDB

const userSchema = new Schema<IUser>(
    {
        // Stores the username, must be unique and trimmed of whitespace
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        // Stores the email, must be unique and required
        email: {
            type: String,
            required: true,
            unique: true,
           
        },

        // Array of ObjectIds referencing Thought documents
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        // Array of ObjectIds referencing other User documents (friends)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true, // Enables the inclusion of virtual properties in JSON output
        },
        id: false, // Prevents Mongoose from adding an `id` virtual field
    }
);


// Virtual property `friendCount` to return the number of friends

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// Initializes and exports the User model

const User = model<IUser>('User', userSchema);

export default User;
