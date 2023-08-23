/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useLocalStorage } from '../../hooks';
import { GameData } from '../../types';
import { UserContext } from '../../context';
import { Board, Message, Button } from '../../components';

import style from './GameLog.module.css'

/**
 * Represents a game for a specific id from the game log.
 */
export default function GameLog() {
    // Extract 'id' from route parameters
    const { id } = useParams<{ id?: string }>();

    const navigate = useNavigate();

    // Retrieve and manage games data using local storage
    const [ games ] = useLocalStorage<GameData[]>('games', []);

    // Get user information and handle unauthorised access
    const { user } = useContext(UserContext);
    if (!user) return <Navigate to="/login" />

    // Find the game corresponding to the provided 'id'
    const game = games.find((game) => game.id === id);
    
    // If the game is not found, display a warning message
    if (!game) {
        return <Message variant='warning' message='Unable to find game!' />
    }

    /**
     * Get the results for the game.
     */
    const getGameResult = () => {
        if (game.winner === 'draw') {
            return `The game was a draw!`;
        } else {
            return `The winner was ${game.winner}!`
        }
    }
    
    return (
        <div className={ style.container }>
            <Message variant={ game.winner } message={ getGameResult() } />
            <Board 
                boardSize={ game.size } 
                board={ game.board } 
                readOnly={ true }
            />
            <Button text='Back' buttonStyle='general' onClick={ () => navigate('/games') } />
        </div>
    )
}
