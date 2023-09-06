/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { object, string, number, TypeOf } from 'zod';

/**
 * Create the Zod schemas for createGameSchema.
 */
export const createGameSchema = object({
    body: object({
      size: number({
        required_error: 'Size is required',
      })
    })
});

/**
 * Create the Zod schemas for updateGameSchema.
 */
export const updateGameSchema = object({
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
});

/**
 * Create the Zod schemas for getGameByIdSchema.
 */
export const getGameByIdSchema = object({
    params: object({
        gameId: string({
            required_error: 'Game id is required',
        })
    })
});

/**
 * Create the Zod schemas for restartGameSchema.
 */
export const restartGameSchema = object({
    body: object({
        gameId: string({
            required_error: 'Game id is required',
        })
    })
});

// Define type aliases for input validation
export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type GetGameByIdInput = TypeOf<typeof getGameByIdSchema>;
export type RestartGameInput = TypeOf<typeof restartGameSchema>;
