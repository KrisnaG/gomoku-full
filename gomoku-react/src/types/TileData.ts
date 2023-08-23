/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { STONE } from "../constants"

/**
 * Data that each tile contains.
 */
export type TileData = {
    stone: STONE
    order: number
}