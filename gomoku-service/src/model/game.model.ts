/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

/**
 * Represents the types of stones.
 */
export enum STONE {
    EMPTY = "EMPTY",
    WHITE = "WHITE",
    BLACK = "BLACK",
    WHITE_WIN = "WHITE_WIN",
    BLACK_WIN = "BLACK_WIN"
}

/**
 * Interface representing a single tile.
 */
export interface TileData {
    stone: STONE;
    order: number;
};

/**
 * Interface representing a played game.
 */
export interface GameData {
    size: number;
    date: string;
    winner: string;
    board: TileData[][];
    totalMoves: number;
};

/**
 * Interface representing a game document in the database.
 */
export interface GameDocument extends GameData, Document {
    userId: UserDocument["_id"];
}

/**
 * Mongoose schema for the 'games' collection.
 */
const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    size: { type: Number, required: true },
    date: { type: String, required: true },
    winner: { type: String, required: true },
    board: [
        {
            type: [
                {
                    stone: { type: String, enum: Object.values(STONE), required: true },
                    order: { type: Number, required: true }
                }
            ],
            required: true
        }
    ],
    totalMoves: { type: Number, required: true }
});

/**
 * Mongoose model for the 'Game' collection, using the GameDocument interface.
 */
export default mongoose.model<GameDocument>('Game', gameSchema);
