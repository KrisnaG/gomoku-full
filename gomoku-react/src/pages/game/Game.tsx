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

import style from './Game.module.css';
import { GameData } from "../../types";

/**
 * Represents a Gomoku game and game play logic
 */
export default function Game() {
    // Get the gameId from the location state
    const location = useLocation();
    const { gameId } = location.state;

    // Set up the game state
    const [ game, setGame ] = useState<GameData>()
    const [ gameOver, setGameOver ] = useState(false);
    const navigate = useNavigate();

    /**
     * 
     * @param gameId 
     */
    const fetchGameDetails = async (gameId: string) => {
        const game: GameData = await get<GameData>(`${API_HOST}/games/${gameId}`);
        setGame(game);
    }

    /**
     * 
     */
    useEffect(() => {
        fetchGameDetails(gameId)
    }, [gameId])

    // Get the logged-in user from context
    const { user } = useContext(UserContext);
    
    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />
    } else if (!game) {
        return null
    }

    /**
     * Handle a tile click event.
     * @param {number} row - The row index of the clicked tile.
     * @param {number} col - The column index of the clicked tile.
     */
    const handleTileClick = async (row: number, col: number) => {
        if (gameOver) return;

        const result: GAME_STATUS = await put(`${API_HOST}/games`, {
            gameId,
            row,
            col
        });

        // Check for a winner or draw
        if (result === GAME_STATUS.WINNER_BLACK || result === GAME_STATUS.WINNER_WHITE || result === GAME_STATUS.DRAW) {
            setGameOver(true);
        }

        await fetchGameDetails(gameId);
    };

    /**
     * Restart the game with a empty board.
     */
    const restartGame = () => {
    }

    /**
     * Leave the game and save it to the list of games if it's over.
     */
    const leaveGame = () => {
        if (gameOver) {
            navigate('/games');
        } else {
            navigate('/');
        }
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
                <Button text='Restart' buttonStyle='general' onClick={ restartGame } />
                <Button text='Leave' buttonStyle='general' onClick={ leaveGame } />
            </div>
        </div>
    );
}
