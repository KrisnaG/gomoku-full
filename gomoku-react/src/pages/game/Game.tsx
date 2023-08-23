/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import UserContext from '../../context/UserContext';
import { useLocalStorage } from "../../hooks";
import { Board, Message } from "../../components";
import { GAME_STATUS, STONE } from "../../constants";
import { TileData, GameData } from "../../types";
import { findWinningCoordinates } from "../../utility";

import style from './Game.module.css';
import Button from "../../components/button/Button";

/**
 * Represents a Gomoku game and game play logic
 */
export default function Game() {
    /**
     * Initialise the game board with empty tiles.
     * @returns Empty game board.
     */
    const getInitialBoard = (): TileData[][] => {
        return Array.from({ length: boardSize }, () => 
            new Array(boardSize).fill({ stone: STONE.EMPTY, order: null }));
    }
    
    // Get the board size from the location state
    const location = useLocation();
    const { boardSize } = location.state;

    // Retrieve and manage games data using local storage
    const [games, setGames] = useLocalStorage<GameData[]>('games', []);

    // Set up the game state
    const [ board, setBoard ] = useState(getInitialBoard());
    const [ gameStatus, setGameStatus ] = useState(GAME_STATUS.TURN_BLACK);
    const [ totalStonesPlaced, setTotalStonesPlaced ] = useState(1);
    const [ gameOver, setGameOver ] = useState(false);
    const navigate = useNavigate();

    // Get the logged-in user from context
    const { user } = useContext(UserContext);
    
    // If user is not logged in, redirect to login
    if (!user) return <Navigate to="/login" />

    /**
     * Updates the game board with the winning coordinates and the appropriate win state.
     * @param winner The player who won.
     * @param winningCoordinates The list of coordinates that indicate the winning configuration.
     */
    const setWinningBoard = (winner: STONE, winningCoordinates: [number, number][]) => {
        const winnerState = winner === STONE.BLACK ? STONE.BLACK_WIN : STONE.WHITE_WIN;
        const newBoard = [...board];
            for (const [row, col] of winningCoordinates) {
                newBoard[row][col] = { stone: winnerState, order: newBoard[row][col].order }
        }
        setBoard(newBoard);
    }
    
    /**
     * Handle a tile click event.
     * @param {number} row - The row index of the clicked tile.
     * @param {number} col - The column index of the clicked tile.
     */
    const handleTileClick = (row: number, col: number) => {
        if (gameOver) return;

        const currentPlayer = gameStatus === GAME_STATUS.TURN_BLACK ? STONE.BLACK : STONE.WHITE;
        const newBoard = [...board];
        newBoard[row][col] = { stone: currentPlayer, order: totalStonesPlaced };
        setBoard(newBoard);

        const winningCoordinates = findWinningCoordinates(row, col, currentPlayer, board);
        
        // Check for a winner or draw
        if (winningCoordinates.length > 0) {
            setGameStatus(currentPlayer === STONE.BLACK ? GAME_STATUS.WINNER_BLACK : GAME_STATUS.WINNER_WHITE);
            setWinningBoard(currentPlayer, winningCoordinates);
            setGameOver(true);
        } else if (totalStonesPlaced === boardSize * boardSize) {
            setGameStatus(GAME_STATUS.DRAW);
            setGameOver(true);
        } else {
            setGameStatus(gameStatus === GAME_STATUS.TURN_BLACK ? GAME_STATUS.TURN_WHITE : GAME_STATUS.TURN_BLACK);
            setTotalStonesPlaced(totalStonesPlaced  + 1);
        }
    };

    /**
     * Restart the game with a empty board.
     */
    const restartGame = () => {
        setBoard(getInitialBoard());
        setGameStatus(GAME_STATUS.TURN_BLACK);
        setTotalStonesPlaced(1);
        setGameOver(false);
    }

    /**
     * Leave the game and save it to the list of games if it's over.
     */
    const leaveGame = () => {
        if (gameOver) {
            setGames([
                ...games, 
                { 
                    size: boardSize, 
                    date: new Date().toString(), 
                    winner: getPlayer(), 
                    totalMoves: totalStonesPlaced, 
                    board: board, 
                    id: uuidv4() }
            ]);
            navigate('/games');
        } else {
            navigate('/');
        }
    }

    /**
     * Gets the current player based on the game status.
     */
    const getPlayer = () => {
        const words = gameStatus.split(' ');
        return words[words.length - 1].toLocaleLowerCase(); 
    }

    return (
        <div className={ style.container }>
            <Message variant={ getPlayer() } message={ gameStatus } />
            <Board 
                boardSize={ boardSize } 
                board={ board } 
                onTileClick={ handleTileClick } 
                readOnly={ gameOver }
            />
            <div className={ style.buttonGroup }>
                <Button text='Restart' buttonStyle='general' onClick={ restartGame } />
                <Button text='Leave' buttonStyle='general' onClick={ leaveGame } />
            </div>
        </div>
    );
}
