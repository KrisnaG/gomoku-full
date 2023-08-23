/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { memo } from "react";

import { STONE } from "../../constants";

import style from './Tile.module.css';

/**
 * Props for the Tile component.
 */
type TileProps = {
    row: number,
    col: number,
    tileStatus: STONE,
    onClick: (position: [number, number]) => void,
    order: number,
    readOnly: boolean
};

/**
 * Represents a single tile on the game board.
 * @param {TileProps} props - The props for the Tile component.
 */
export default memo(function Tile({
    row,
    col,
    tileStatus,
    onClick,
    order,
    readOnly
}: TileProps) {
    
    /**
     * Determine the appropriate class name for the tile.
     */
    const getTileClassName = () => {
        switch (tileStatus) {
            case STONE.BLACK_WIN:
                return `${style.tile}  ${style.blackWin}`;
            case STONE.WHITE_WIN:
                return `${style.tile} ${style.whiteWin}`;
            case STONE.BLACK:
                return `${style.tile}  ${style.black}`;
            case STONE.WHITE:
                return `${style.tile} ${style.white}`;
            default:
                return `${style.tile}`;
        }
    };

    /**
     * Handle click events for the tile.
     */
    const handleClick = () => {
        if (tileStatus === STONE.EMPTY) {
            onClick([row, col]);
        }
    };

    return ( 
        <div 
            className = { getTileClassName() }
            onClick = { handleClick } 
        >
            <p>{ readOnly ? (order ?? '') : undefined }</p>
        </div>
    )
})