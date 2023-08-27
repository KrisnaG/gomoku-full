/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import GameModel, { GameDocument } from '../model/game.model';

/**
 * Retrieve a list of played games.
 * @returns {Promise<GameDocument[]>} A promise that resolves to an array of game documents.
 */
export async function getAllGames() {
    return GameModel.find().lean();
}

/**
 * Retrieve a single game by its ID.
 * @param {string} id - The ID of the game to retrieve.
 * @returns {Promise<GameDocument | null>} A promise that resolves to the game document or null if not found.
 */
export async function getGameById(id: string) {
    return GameModel.findById(id).lean();
}

/**
 * Create a new game.
 * @param {GameDocument} gameData - The data of the game to create.
 * @returns {Promise<GameDocument>} A promise that resolves to the created game document.
 */
export async function createGame(gameData: GameDocument) {
    return GameModel.create(gameData);
}
