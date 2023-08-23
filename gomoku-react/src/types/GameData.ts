/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { TileData } from "./TileData"

/**
 * Data that each played game contains.
 */
export type GameData = {
    size: number
    date: string
    winner: string
    board: TileData[][]
    totalMoves: number
    id: string
}