/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { UserContext } from '../../context';
import { Message } from "../../components";
import { GameData } from "../../types";
import Button from "../../components/button/Button";
import { API_HOST, GAME_STATUS } from "../../constants";
import { get } from "../../utility";

import style from './Games.module.css'

/**
 * Represents a list of all the games played.
 */
export default function Games() {
    const navigate = useNavigate();
    const [ games, setGames ] = useState<GameData[]>();

    /**
     * Fetches all game details from the server.
     */
    const fetchAllGameDetails = async () => {
        const allGames: GameData[] = await get<GameData[]>(`${API_HOST}/games/`);
        setGames(allGames);
    }

    // Fetches all game details when the component mounts.
    useEffect(() => {
        fetchAllGameDetails()
    }, [])

    // Get the logged-in user from context
    const { user } = useContext(UserContext);

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />
    } else if (!games) {
        return null
    }

    /**
     * Check if the game status indicates that the game is over.
     * @param status The current status of the game.
     * @returns True if the game is over, false otherwise.
     */
    const isGameOver = (status: string) => {
        return (
            status === GAME_STATUS.DRAW || 
            status === GAME_STATUS.WINNER_BLACK || 
            status === GAME_STATUS.WINNER_WHITE
        );
    }

    /**
     * Navigate to the appropriate game page based on the game status.
     * If the game is over, navigate to the game log page. Otherwise, navigate to the game page.
     * @param status The current status of the game.
     * @param gameId The ID of the game.
     */
    const navigateToGame = (status: string, gameId: string) => {
        if (isGameOver(status)) {
            navigate(`/game-log/${gameId}`)
        } else {
            navigate('/game', { state: { gameId: gameId } });
        }
    }

    return (
        <div className={ style.container }>
            <h1 className={ style.title }>
                GAME LOG
            </h1>
            { games.length === 0 ? ( <Message variant='warning' message='No games available' /> ) :
            (games.map((game, index) => {
                const date = new Date(game.date);
                return (
                    <div key={ index } className={ style.game }>
                        <div className={ style.info }>
                            <p>
                                Game #{ index + 1 } &emsp;
                                @{ date.toLocaleTimeString() } { date.toLocaleDateString() } &emsp; 
                                { game.status }
                            </p>
                        </div>
                        <Button
                            text={ isGameOver(game.status) ? "View Game Log" : "Continue Game"}
                            buttonStyle='general'
                            additionalClassName={ style.log }
                            onClick={ () => navigateToGame(game.status, game.gameId) } 
                        />
                    </div>)
            }))}
        </div>
    )
}
