/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { GAME_STATUS, STONE } from "../constants";
import { GameDocument, GameModelSchema, TileData } from "../model/game.model";

/**
 * Create an empty game with the specified size, date, and user ID.
 * @param {number} size - The size of the game board.
 * @param {string} userId - The ID of the user associated with the game.
 * @param {GameDocument} game - Optional existing game data to update or modify.
 * @returns {GameDocument} An empty game with the provided parameters.
 */
export function createEmptyGame(size: number, userId: string, game?: GameDocument): GameDocument {
    let emptyGame: GameDocument;

    // Create a new empty game instance or update an existing game if provided
    if (!game) {
        emptyGame = new GameModelSchema({
            userId: userId,
            size: size,
            status: GAME_STATUS.TURN_BLACK,
            board: [],
            totalMoves: 0,
            readOnly: false
        });
    } else {
        emptyGame = new GameModelSchema(game);
        emptyGame.status = GAME_STATUS.TURN_BLACK;
        emptyGame.board = [];
        emptyGame.totalMoves = 0;
    }

    const emptyTileData: TileData = { stone: STONE.EMPTY, order: undefined }
    
    // Initialise the board with empty tiles
    for (let i = 0; i < size; i++) {
        const row: TileData[] = [];
        for (let j = 0; j < size; j++) {
            row.push(emptyTileData);
        }
        emptyGame.board.push(row);
    }

    return emptyGame;
}