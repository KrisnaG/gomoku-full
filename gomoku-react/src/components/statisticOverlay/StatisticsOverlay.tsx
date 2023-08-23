/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { GameData } from '../../types';
import { Button } from '../../components';

import style from './StatisticsOverlay.module.css';

/**
 * Define the props expected by the StatisticsOverlay component.
 */
type StatisticsOverlayProp = {
    onClose: () => void
    games: GameData[]
};

/**
 * StatisticsOverlay component displays statistics about the provided game data.
 * @param {StatisticsOverlayProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function StatisticsOverlay({ onClose, games }: StatisticsOverlayProp) {
        // Calculate statistics based on the games
        const totalGames = games.length;
        const blackWins = games.filter((game) => game.winner === 'black').length;
        const whiteWins = games.filter((game) => game.winner === 'white').length;
        const totalDraws = games.filter((game) => game.winner === 'draw').length;
    
        // Calculate the average number of moves
        const totalMoves = games.reduce((total, game) => total + game.totalMoves, 0);
        const averageMoves = totalGames > 0 ? totalMoves / totalGames : 0;
    
        return (
            <div className={ style.container }>
                <div className={ style.content }>
                    <h2>Statistics</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Total Games</th>
                                <th>Black Wins</th>
                                <th>White Wins</th>
                                <th>Draws</th>
                                <th>Average Moves</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ totalGames }</td>
                                <td>{ blackWins }</td>
                                <td>{ whiteWins }</td>
                                <td>{ totalDraws }</td>
                                <td>{ averageMoves.toFixed(2) }</td>
                            </tr>
                        </tbody>
                    </table>
                <Button text='Close' buttonStyle='general' onClick={ onClose } />
                </div>
            </div>
        );

}
