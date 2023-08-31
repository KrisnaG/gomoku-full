/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import GameModel, { GameDocument } from '../model/game.model';

/**
 * Retrieve a list of played games.
 * @returns {Promise<>[]} An array of simplified game information.
 */
export async function getAllGames() {
    return (await GameModel.find().lean()).map(game => {
        return {
            '_id': game._id,
            'status': game.status,
            'date': game.date
        }
    });
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

/**
 * Update a game with new information.
 * @param {string} gameId - The ID of the game to be updated.
 * @param {GameDocument} game - The updated game information.
 * @returns {Promise<GameDocument | null>} The updated game or null if not found.
 */
export async function updateGame(gameId: string, game: GameDocument) {
    return GameModel.findByIdAndUpdate(
        { _id: gameId },
        game,
        { new: true }
    )
}