/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { Tile } from '../.';
import { TileData } from '../../types';

import style from './Board.module.css';

/**
 * Props for the Board component.
 */
type BoardProp = {
    boardSize: number
    board: TileData[][]
    onTileClick?: (row: number, col: number) => void
    readOnly?: boolean
};

/**
 * Represents the board component that contains tiles.
 * @param {BoardProp} props - The props for the Board component.
 */
export default function Board({ boardSize, board, onTileClick, readOnly = false }: BoardProp) {
    
    return (
        <div className={ style.board }>
            {board.map((row, rowIndex) => (
                <div 
                    key={ rowIndex } 
                    className={ style.row }
                    style={{ gridTemplateColumns: `repeat(${boardSize}, 3.5rem)` }}
                >
                    {row.map((tile, colIndex) => (
                        <Tile
                            key={ (rowIndex * boardSize) + colIndex }
                            row={ rowIndex }
                            col={ colIndex }
                            tileStatus={ tile.stone }
                            onClick={ ([row, col]) => onTileClick?.(row, col) }
                            order={ tile.order }
                            readOnly={ readOnly }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
