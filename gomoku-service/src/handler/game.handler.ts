/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import validateSchema from '../middleware/validateSchema'
import { getAllGames, getGameById, createGame } from '../service/game.service';
import { getGameByIdSchema, createGameSchema } from '../schema/game.schema'

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
    '/:id', 
    validateSchema(getGameByIdSchema), 
    async (req: Request, res: Response) => {
        try {
            const gameId = req.params.id
            if (!mongoose.Types.ObjectId.isValid(gameId)) {
                return res.status(400).json({ error: 'Invalid game ID' });
            }
            const game = await getGameById(gameId);
            if (!game) {
                return res.status(404).send('Game not found' );
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
        const newGame = await createGame(req.body);
        return res.status(200).send(newGame);
    } catch (error) {
        res.status(500).send('Internal server error' );
    }
});

export default gameHandler;
