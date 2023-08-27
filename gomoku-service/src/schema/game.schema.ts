/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { object, string, number, array, TypeOf } from 'zod';
import { STONE } from '../model/game.model';

/**
 * Define schema for a single tile's data.
 */
const tileData = {
    stone: string({
        required_error: 'Tile stone is required',
    }).refine((value) => Object.values(STONE).includes(value as STONE)),
    order: number({
        required_error: 'Tile order is required',
    }),
};

/**
 * Define schema for an array of tile data.
 */
const tileDataArray = array(object(tileData)).nonempty();

/**
 * Define schema for the payload data used in create and update operations.
 */
const payload = {
    body: object({
        size: number({
            required_error: 'Size is required',
        }),
        date: string({
            required_error: 'Date is required',
        }),
        winner: string({
            required_error: 'Winner is required',
        }),
        board: tileDataArray,
        totalMoves: number({
            required_error: 'Total moves are required',
        }),
    }),
};

/**
 * Define schema for parameters used in update and delete operations.
 */
const updateDeleteParams = {
    params: object({
        id: string({
            required_error: 'Game id is required',
        }),
    }),
};

/**
 * Define schema for parameters used in get operations.
 */
const getParams = {
    params: object({
        id: string({
            required_error: 'Game id is required',
        }),
    }),
};

/**
 * Create the Zod schemas for createGameSchema.
 */
export const createGameSchema = object({
    ...payload,
});

/**
 * Create the Zod schemas for updateGameSchema.
 */
export const updateGameSchema = object({
    ...payload,
    ...updateDeleteParams,
});

/**
 * Create the Zod schemas for getGameByIdSchema.
 */
export const getGameByIdSchema = object({
    ...getParams,
});

// Define type aliases for input validation
export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type getGameByIdInput = TypeOf<typeof getGameByIdSchema>;