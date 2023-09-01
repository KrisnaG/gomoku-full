/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_HOST, MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../../constants';
import { Button } from '../../components';
import { post } from '../../utility';

import style from './Home.module.css';

/**
 * Home page component for selecting the board size and starting the game.
 */
export default function Home() {
    const [ boardSize, setBoardSize ] = useState(MIN_BOARD_SIZE);
    const navigate = useNavigate();

    // Generate board size options between the min and max sizes
    const generateBoardSizeOptions = () => {
        return Array.from({ length: MAX_BOARD_SIZE - MIN_BOARD_SIZE + 1 }, (_, index) => {
            const size: number = MIN_BOARD_SIZE + index;
            return (
                <option key={ size } value={ size }>
                    { size }
                </option>
            );
        });
    };

    // Event handler to update the selected board size when the dropdown changes
    const handleBoardSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const size: number = Number(event.target.value);
        setBoardSize(size);
    };


    // Event handler to start the game and pass the board size
    const handleStartGame = async () => {
        const gameId: string = await post(`${API_HOST}/games`, { boardSize });
        navigate('/game', { state: { gameId: gameId } });
    };

    return (
        <div className={ style.container }>
            <h1>Select a board size:</h1>
            <select 
                className={ style.boardSelect } 
                value={ boardSize } 
                onChange={ handleBoardSizeChange }
            >
                { generateBoardSizeOptions() }
            </select>
            <Button text='Start' buttonStyle='general' onClick={ handleStartGame } />
        </div>
    )
}
