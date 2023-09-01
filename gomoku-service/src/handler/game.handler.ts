/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';


import validateSchema from '../middleware/validateSchema'
import { getAllGames, getGameById, createGame, updateGame } from '../service/game.service';
import { getGameByIdSchema, createGameSchema, updateGameSchema } from '../schema/game.schema'
import { GameDocument, TileData, GameModelSchema } from '../model/game.model';
import { GAME_STATUS, STONE } from '../constants';
import { isPlayerWinner } from '../game';

const gameHandler = express.Router();

/**
 * Endpoint to retrieve a list of played games.
 */
gameHandler.get('/', async (req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        return res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Endpoint to retrieve a single game by ID.
 * Validates the request parameter using getGameByIdSchema.
 */
gameHandler.get(
    '/:gameId', 
    validateSchema(getGameByIdSchema), 
    async (req: Request, res: Response) => {
        try {
            const gameId = req.params.gameId
            if (!mongoose.Types.ObjectId.isValid(gameId)) {
                return res.status(400).json({ error: 'Invalid game ID' });
            }
            const game = await getGameById(gameId);
            if (!game) {
                return res.status(404).send('Game not found');
            }
            return res.status(200).send(game);
        } catch (error) {
            res.status(500).send(error);
        }
});

/**
 * Endpoint to create a new game.
 * Validates the request body using createGameSchema.
 */
gameHandler.post(
    '/', 
    validateSchema(createGameSchema),
    async (req: Request, res: Response) => {
        try {
            const { size, date, userId } = req.body;
            const emptyGame = createEmptyGame(size, date, userId);
            const newGame = await createGame(emptyGame);

            return res.status(200).send(newGame._id);
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }
);

/**
 * Endpoint to update the current game.
 * Validates the request body using updateGameSchema.
 */
gameHandler.put(
    '/', 
    validateSchema(updateGameSchema),
    async (req: Request, res: Response) => {
        try {
            const { gameId, x, y } = req.body;
            
            if (!mongoose.Types.ObjectId.isValid(gameId)) {
                return res.status(400).json({ error: 'Invalid game ID' });
            }
            
            const game = await getGameById(gameId);
            
            if (!game) {
                return res.status(404).send('Game not found');
            }
            
            if (game.readOnly) {
                return res.status(400).send('Cannot update a complete game');
            }

            if (x >= game.size || y >= game.size || x < 0 || y < 0) {
                return res.status(400).send('Coordinates are out of bounds');
            }
            
            if (game.board[x][y].stone !== STONE.EMPTY) {
                return res.status(400).send(`Invalid move at (${x}, ${y})`);
            }
            
            const player: STONE = game.status === GAME_STATUS.TURN_BLACK ? STONE.BLACK : STONE.WHITE;
            game.totalMoves += 1;
            game.board[x][y] = { stone: player, order: game.totalMoves };
            
            if (isPlayerWinner(x, y, player, game.board)) {
                game.status = player === STONE.BLACK ? GAME_STATUS.WINNER_BLACK: GAME_STATUS.WINNER_WHITE;
                game.readOnly = true;
            } else if (game.totalMoves === game.size * game.size) {
                game.status = GAME_STATUS.DRAW;
                game.readOnly = true;
            } else {
                game.status = game.status === GAME_STATUS.TURN_BLACK ? GAME_STATUS.TURN_WHITE: GAME_STATUS.TURN_BLACK;
            }

            const newGame = await updateGame(gameId, game);

            return res.status(200).send(newGame?.status);
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal server error');
        }
    }
);


/**
 * Create an empty game with the specified size, date, and user ID.
 * @param {number} size - The size of the game board.
 * @param {string} date - The date of the game creation.
 * @param {string} userId - The ID of the user associated with the game.
 * @returns {GameDocument} An empty game with the provided parameters.
 */
export function createEmptyGame(size: number, date: string, userId: string): GameDocument {
    
    const emptyGame: GameDocument = new GameModelSchema({
        userId: userId,
        size: size,
        date: date,
        status: GAME_STATUS.TURN_BLACK,
        board: [],
        totalMoves: 0,
        readOnly: false
    });

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

export default gameHandler;
