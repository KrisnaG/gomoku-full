/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import mongoose, { Document } from "mongoose";

/**
 * Interface representing the input fields for creating a user.
 */
export interface UserInput {
    username: string;
    password: string;
}

/**
 * Interface representing a user document in the database.
 */
export interface UserDocument extends UserInput, Document {
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Mongoose schema for the 'users' collection.
 */
const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    // The timestamps option tells Mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
},{ timestamps: true })

/**
 * Mongoose model for the 'User' collection, using the UserDocument interface.
 */
export default mongoose.model<UserDocument>('User', userSchema)