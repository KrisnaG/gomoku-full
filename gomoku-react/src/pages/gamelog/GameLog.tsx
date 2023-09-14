/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { GameData } from '../../types';
import { UserContext } from '../../context';
import { Board, Message, Button } from '../../components';
import { get } from '../../utility';
import { API_HOST } from '../../constants';

import style from './GameLog.module.css'

/**
 * Represents a game for a specific id from the game log.
 */
export default function GameLog() {
    // Extract 'id' from route parameters
    const { id } = useParams<{ id?: string }>();
    const [ game, setGame ] = useState<GameData>();

    const navigate = useNavigate();

    // Fetch game details when the 'id' dependency changes.
    useEffect(() => {
        /**
         * Fetches game details from the server based on the provided gameId.
         * @param gameId - The unique identifier of the game to fetch.
         */
        const fetchGameDetails = async (gameId: string) => {
            try {
                const game: GameData = await get<GameData>(`${API_HOST}/games/${gameId}`);
                setGame(game);
            } catch (error) {
                console.log((error as Error).message);
                navigate('/');
            }
        }
        if (id) {
            fetchGameDetails(id)
        }
    }, [id, navigate]);

    // Get user information and handle unauthorised access
    const { user } = useContext(UserContext);
    if (!user) return <Navigate to="/login" />

    

    // If the game is not found, display a warning message
    if (!game) {
        return <Message variant='warning' message='Unable to find game!' />
    }

    /**
     * Get the results for the game.
     */
    const getGameResult = () => {
        if (game.status === 'draw') {
            return `The game was a draw!`;
        } else {
            return `The winner was ${game.status}!`
        }
    }
    
    return (
        <div className={ style.container }>
            <Message variant={ game.status } message={ getGameResult() } />
            <Board 
                boardSize={ game.size } 
                board={ game.board } 
                readOnly={ true }
            />
            <Button text='Back' buttonStyle='general' onClick={ () => navigate('/games') } />
        </div>
    )
}
