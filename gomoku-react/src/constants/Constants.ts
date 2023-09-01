/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

/**
 * Minimum allowed board size.
 */
export const MIN_BOARD_SIZE = 5;

/**
 * Maximum allowed board size.
 */
export const MAX_BOARD_SIZE = 20;

/**
 * Number of stones in a row required to win
 */
export const NUMBER_STONES_TO_WIN = 5;

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
 * Represents the type of game statuses.
 */
export enum GAME_STATUS {
    DRAW = "Game is a draw",
    WINNER_WHITE = "Winner: WHITE",
    WINNER_BLACK = "Winner: BLACK",
    TURN_WHITE = "Player turn: WHITE",
    TURN_BLACK = "Player turn: BLACK"
}

/**
 * Represents the base URL for the API.
 * If REACT_APP_API_HOST environment variable is set, it uses that value, otherwise an empty string.
 */
export const API_HOST = process.env.REACT_APP_API_HOST ?? 'http://localhost:8080'