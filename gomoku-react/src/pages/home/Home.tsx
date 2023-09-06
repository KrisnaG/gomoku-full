/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_HOST, MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../../constants';
import { Button } from '../../components';
import { post } from '../../utility';

import style from './Home.module.css';
import { UserContext } from '../../context';

/**
 * Home page component for selecting the board size and starting the game.
 */
export default function Home() {
    const [ boardSize, setBoardSize ] = useState(MIN_BOARD_SIZE);
    const navigate = useNavigate();

    // Get the logged-in user from context
    const { user } = useContext(UserContext);
    
    /**
     * Generate board size options between the min and max sizes
     * @returns An array of option elements for board size selection.
     */
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

    /**
     * Event handler to update the selected board size when the dropdown changes
     * @param event The change event from the board size dropdown.
     */
    const handleBoardSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const size: number = Number(event.target.value);
        setBoardSize(size);
    };

    /**
     * Event handler to start the game and pass the board size
     */
    const handleStartGame = async () => {
        if (!user) {
            navigate('/login');
        } else {
            const gameId: string = await post(`${API_HOST}/games`, { 
                size: boardSize
            });
            navigate('/game', { state: { gameId: gameId } });
        }
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
