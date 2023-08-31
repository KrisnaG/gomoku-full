/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { object, string, number, TypeOf } from 'zod';

/**
 * Define schema for parameters used in update operations.
 */
const updateParams = {
    body: object({
        gameId: string({
            required_error: 'Game id is required',
        }),
        x: number({
            required_error: 'X coordinate is required',
        }),
        y: number({
            required_error: 'Y coordinate is required',
        }),
    })
};

/**
 * Define schema for parameters used in get operations.
 */
const getParams = {
    params: object({
        gameId: string({
            required_error: 'Game id is required',
        })
    }),
};

/**
 * Create the Zod schemas for createGameSchema.
 */
export const createGameSchema = object({
    body: object({
      size: number({
        required_error: 'Size is required',
      }),
      date: string({
        required_error: 'Date is required',
      }),
      userId: string({
        required_error: 'User ID is required',
      }),
    }),
});

/**
 * Create the Zod schemas for updateGameSchema.
 */
export const updateGameSchema = object({
    ...updateParams,
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