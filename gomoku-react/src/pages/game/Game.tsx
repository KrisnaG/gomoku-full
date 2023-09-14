/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import UserContext from '../../context/UserContext';
import { Board, Message } from "../../components";
import { API_HOST, GAME_STATUS } from "../../constants";
import { get, put } from "../../utility";
import Button from "../../components/button/Button";
import { GameData } from "../../types";

import style from './Game.module.css';

/**
 * Represents a Gomoku game and game play logic
 */
export default function Game() {
    // Get the gameId from the location state
    const location = useLocation();   
    const { gameId } = location.state || "";
    
    // Set up the game state
    const [ game, setGame ] = useState<GameData>();
    const [ gameOver, setGameOver ] = useState(false);
    const navigate = useNavigate();
    const [ error, setError ] = useState('');
    
    /**
     * Fetch game details by gameId and update the state.
     * @param {string} gameId - The ID of the game to fetch.
    */
   const fetchGameDetails = async (gameId: string) => {
        try {
            const game: GameData = await get<GameData>(`${API_HOST}/games/${gameId}`);
            setGame(game);
            setError('');
        } catch (error) {
            setError((error as Error).message);
        }
    }
    
    // Fetch game details on mount
    useEffect(() => {
        fetchGameDetails(gameId)
    }, [gameId])
    
    // Get the logged-in user from context
    const { user, logout } = useContext(UserContext);
    
    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />
    }

    // The game is still fetching
    if (!game) {
        if (error === '') {
            return <Message variant='info' message='Fetching Game ...'/>
        } else {
            return <Message variant='error' message={ error }/>
        }
    }
    
    /**
     * Handle a tile click event.
     * @param {number} row - The row index of the clicked tile.
     * @param {number} col - The column index of the clicked tile.
     */
    const handleTileClick = async (row: number, col: number) => {
        // Cannot modify a complete game
        if (gameOver) return;

        try {
            // Put request
            const response: GameData = await put(`${API_HOST}/games`, {
                gameId: gameId,
                x: row,
                y: col
            })
            
            const status = response.status
            
            // Check for a winner or draw
            if (response.status === GAME_STATUS.WINNER_BLACK || status === GAME_STATUS.WINNER_WHITE || status === GAME_STATUS.DRAW) {
                setGameOver(true);
            }

            // Update game board
            await fetchGameDetails(gameId);
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    };

    /**
     * Restart the game with a empty board.
     */
    const restartGame = async () => {
        if (!window.confirm('The game is still in progress, are you sure to restart?'))
            return

        try {
            await put(`${API_HOST}/games/restart`, {
                gameId: gameId,
            })
            await fetchGameDetails(gameId);
        } catch (error) {
            console.log((error as Error).message)
            logout()
            navigate('/')
        }
    }

    /**
     * Leave the game and navigate to games log.
     */
    const leaveGame = () => {
        if (!gameOver)
            if (!window.confirm('The game is still in progress, are you sure to leave?'))
                return
        
        navigate('/games');
    }

    /**
     * Gets the current player based on the game status.
     */
    const getPlayer = () => {
        const words = game.status.split(' ') ;
        return words[words.length - 1].toLocaleLowerCase(); 
    }

    return (
        <div className={ style.container }>
            <Message variant={ getPlayer() } message={ game.status } />
            <Board 
                boardSize={ game.size } 
                board={ game.board } 
                onTileClick={ handleTileClick } 
                readOnly={ game.readOnly }
            />
            <div className={ style.buttonGroup }>
                { gameOver ? <div/> : <Button text='Restart' buttonStyle='general' onClick={ restartGame } />}
                <Button text='Leave' buttonStyle='general' onClick={ leaveGame } />
            </div>
        </div>
    );
}
