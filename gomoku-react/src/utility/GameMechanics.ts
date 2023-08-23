/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { STONE, NUMBER_STONES_TO_WIN } from "../constants";
import { TileData } from "../types";

/**
 * Checks if a player has won the game (number of consecutive player stones).
 * @param row Row to start checking from.
 * @param col Column to start checking from.
 * @param player The player to check for.
 * @param board The game board represented as a 2D array of TileData.
 * @returns An array of coordinates ([row, col]) indicating the winning configuration, if found.
*/
export function findWinningCoordinates(row: number, col: number, player: STONE, board: TileData[][]): [number, number][] {
    const winningCoordinates: [number, number][] = [];

    // Get coordinates of stones in rows, columns, and diagonals
    const stonesRow = getCoordinatesOfStonesInRowForPlayer(row, col, player, board);
    const stonesCol = getCoordinatesOfStonesInColForPlayer(row, col, player, board);
    const stonesForward = getCoordinatesOfStonesInDiagonalBackSlashForPlayer(row, col, player, board);
    const stonesBack = getCoordinatesOfStonesInDiagonalForwardSlashForPlayer(row, col, player, board);

    // Check if any configuration has enough stones to win
    if (stonesRow.length >= NUMBER_STONES_TO_WIN) {
        winningCoordinates.push(...stonesRow);
    }
    if (stonesCol.length >= NUMBER_STONES_TO_WIN) {
        winningCoordinates.push(...stonesCol);
    }
    if (stonesForward.length >= NUMBER_STONES_TO_WIN) {
        winningCoordinates.push(...stonesForward);
    }
    if (stonesBack.length >= NUMBER_STONES_TO_WIN) {
        winningCoordinates.push(...stonesBack);
    }

    return winningCoordinates;
}

/**
 * Check if a tile on the board is the players stone.
 * @param row Row of tile.
 * @param col Column of tile.
 * @param player Player to check stone for.
 * @param board The game board represented as a 2D array of TileData.
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
 * Get the Coordinates of consecutive stones in a row for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @param board The game board represented as a 2D array of TileData.
 * @returns The Coordinates of consecutive player stones counted.
 */
function getCoordinatesOfStonesInRowForPlayer(row: number, col: number, player: STONE, board: TileData[][]): [number, number][] {
    const coordinates: [number, number][] = [[row, col]];
    let left = col;
    let right = col;
    // Check stones to the left
    while (isPlayersStone(row, --left, player, board)) {
        coordinates.push([row, left]);
    }
    // Check stones to the right
    while (isPlayersStone(row, ++right, player, board)) {
        coordinates.push([row, right]);
    }
    return coordinates;
}

/**
 * Get the Coordinates of consecutive stones in a column for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @param board The game board represented as a 2D array of TileData.
 * @returns The Coordinates of consecutive player stones counted.
 */
function getCoordinatesOfStonesInColForPlayer(row: number, col: number, player: STONE, board: TileData[][]): [number, number][] {
    const coordinates: [number, number][] = [[row, col]];
    let up = row;
    let down = row;
    // Check stones up
    while (isPlayersStone(++up, col, player, board)) {
        coordinates.push([up, col]);
    }
    // Check stones down
    while (isPlayersStone(--down, col, player, board)) {
        coordinates.push([down, col]);
    }
    return coordinates;
}    

/**
 * Get the Coordinates consecutive of stones in a diagonal '\\' pattern for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @param board The game board represented as a 2D array of TileData.
 * @returns The Coordinates of consecutive player stones counted
 */
function getCoordinatesOfStonesInDiagonalBackSlashForPlayer(row: number, col: number, player: STONE, board: TileData[][]): [number, number][] {
    const coordinates: [number, number][] = [[row, col]];
    let up = row;
    let down = row;
    let left = col;
    let right = col;
    // Check stones to top left
    while (isPlayersStone(--up, --left, player, board)) {
        coordinates.push([up, left]);
    }
    // Check stones to bottom right
    while (isPlayersStone(++down, ++right, player, board)) {
        coordinates.push([down, right]);
    }
    return coordinates;
}

/**
 * Get the Coordinates of consecutive stones in a diagonal '/' pattern for the specified player.
 * @param row Row to start counting from.
 * @param col Column to start counting from.
 * @param player The player to check for.
 * @param board The game board represented as a 2D array of TileData.
 * @returns The Coordinates of consecutive player stones counted
 */
function getCoordinatesOfStonesInDiagonalForwardSlashForPlayer(row: number, col: number, player: STONE, board: TileData[][]): [number, number][] {
    const coordinates: [number, number][] = [[row, col]];
    let up = row;
    let down = row;
    let left = col;
    let right = col;
    // Check stones to top right
    while (isPlayersStone(--up, ++right, player, board)) {
        coordinates.push([up, right]);
    }
    // Check stones to bottom left
    while (isPlayersStone(++down, --left, player, board)) {
        coordinates.push([down, left]);
    }
    return coordinates;
}    
