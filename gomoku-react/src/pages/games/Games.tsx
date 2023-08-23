/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useLocalStorage } from "../../hooks";
import { UserContext } from '../../context';
import { Message, StatisticsOverlay } from "../../components";
import { GameData } from "../../types";

import style from './Games.module.css'
import Button from "../../components/button/Button";

/**
 * Represents a list of all the games played.
 */
export default function Games() {
    const [ games, ] = useLocalStorage<GameData[]>('games', []);
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState(false);
    
    const { user, } = useContext(UserContext);
    if (!user) return <Navigate to="/login" />

    /**
     * Get the results for the game.
     */
    const getGameResult = (result: string) => {
        if (result === 'draw') {
            return `Game was a draw`;
        } else {
            return `Winner: ${result}`
        }
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

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
                                { getGameResult(game.winner) }
                            </p>
                        </div>
                        <Button
                            text='View game log' 
                            buttonStyle='general'
                            additionalClassName={ style.log }
                            onClick={ () => navigate(`/game-log/${game.id}`) } 
                        />
                    </div>)
            }))}
            { isOpen && ( <StatisticsOverlay onClose={ () => toggleOverlay() } games={ games } /> ) }
            <Button text='Statistics' buttonStyle='general' onClick={ toggleOverlay } />
        </div>
    )
}
