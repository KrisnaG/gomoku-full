/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";
import { GAME_STATUS, STONE } from "../constants";

/**
 * Interface representing a single tile.
 */
export interface TileData {
    stone: STONE;
    order: number | undefined;
};

/**
 * Interface representing a played game.
 */
export interface GameData {
    size: number;
    date: string;
    status: GAME_STATUS;
    board: TileData[][];
    totalMoves: number;
    readOnly: boolean;
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
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    size: { type: Number, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: Object.values(GAME_STATUS), required: true },
    board: [
        {
            type: [
                {
                    stone: { type: String, enum: Object.values(STONE), required: true },
                    order: { type: Number }
                }
            ],
            required: true
        }   
    ],
    totalMoves: { type: Number, required: true },
    readonly: { type: Boolean, required: true }
});

/**
 * Mongoose model for the 'Game' collection, using the GameDocument interface.
 */
export default mongoose.model<GameDocument>('Game', gameSchema);
export const GameModelSchema = mongoose.model<GameDocument>('Game', gameSchema);
