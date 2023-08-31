/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { STONE, NUMBER_STONES_TO_WIN } from "../constants";
import { TileData } from "../model/game.model";

/**
 * Checks if a player has won the game (number of consecutive player stones).
 * @param row Row to start checking from.
 * @param col Column to start checking from.
 * @param player The player to check for.
*/
export function isPlayerWinner(row: number, col: number, player: STONE, board: TileData[][]): boolean {
    return (
        getNumberOfStonesInRowForPlayer(row, col, player, board) >= NUMBER_STONES_TO_WIN ||
        getNumberOfStonesInColForPlayer(row, col, player, board) >= NUMBER_STONES_TO_WIN ||
        getNumberOfStonesInDiagonalBackSlashForPlayer(row, col, player, board) >= NUMBER_STONES_TO_WIN ||
        getNumberOfStonesInDiagonalForwardSlashForPlayer(row, col, player, board) >= NUMBER_STONES_TO_WIN
    );
}

/**
 * Check if a tile on the board is the players stone.
 * @param row Row of tile.
 * @param col Column of tile.
 * @param player Player to check stone for.
 * @returns True if the stone on the tile if the players, otherwise, false.
 */
function isPlayersStone(row: number, col: number, player: STONE, board: TileData[][]): boolean {
    return (
        row >= 0 && 
        row < board.length && 
        col >= 0 && 
        col < board[0].length && 
        board[row][col].stone === player
    );
}

/**
 * Get the number of consecutive stones in a row for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @returns The number of consecutive player stones counted.
 */
function getNumberOfStonesInRowForPlayer(row: number, col: number, player: STONE, board: TileData[][]): number {
    let left = col;
    let right = col;
    let count = 1;
    // Check stones to the left
    while (isPlayersStone(row, --left, player, board)) {
        count++;
    }
    // Check stones to the right
    while (isPlayersStone(row, ++right, player, board)) {
        count++;
    }
    return count;
}

/**
 * Get the number of consecutive stones in a column for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @returns The number of consecutive player stones counted.
 */
function getNumberOfStonesInColForPlayer(row: number, col: number, player: STONE, board: TileData[][]): number {
    let up = row;
    let down = row;
    let count = 1;
    // Check stones up
    while (isPlayersStone(++up, col, player, board)) {
        count++;
    }
    // Check stones down
    while (isPlayersStone(--down, col, player, board)) {
        count++;
    }
    return count;
}    

/**
 * Get the number consecutive of stones in a diagonal '\\' pattern for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @returns The number of consecutive player stones counted
 */
function getNumberOfStonesInDiagonalBackSlashForPlayer(row: number, col: number, player: STONE, board: TileData[][]): number {
    let up = row;
    let down = row;
    let left = col;
    let right = col;
    let count = 1;
    // Check stones to top left
    while (isPlayersStone(--up, --left, player, board)) {
        count++;
    }
    // Check stones to bottom right
    while (isPlayersStone(++down, ++right, player, board)) {
        count++;
    }
    return count;
}

/**
 * Get the number of consecutive stones in a diagonal '/' pattern for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @returns The number of consecutive player stones counted
 */
function getNumberOfStonesInDiagonalForwardSlashForPlayer(row: number, col: number, player: STONE, board: TileData[][]): number {
    let up = row;
    let down = row;
    let left = col;
    let right = col;
    let count = 1;
    // Check stones to top right
    while (isPlayersStone(--up, ++right, player, board)) {
        count++;
    }
    // Check stones to bottom left
    while (isPlayersStone(++down, --left, player, board)) {
        count++;
    }
    return count;
}    