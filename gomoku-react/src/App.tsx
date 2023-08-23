/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { Routes, Route } from 'react-router-dom'

import { Header, UserProvider } from './components';
import { Home, Login, Register, Game, Games, GameLog } from './pages';

import style from './App.module.css';

/**
 * Main component representing the root of the application.
 */
function App() {
    return (
        <UserProvider>
            <main className={style.main}>
                <Header />
                <div className={style.container}>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/login" element={ <Login/> } />
                        <Route path="/register" element={ <Register/> } />
                        <Route path="/game" element={ <Game /> } />
                        <Route path="/games" element={ <Games /> } />
                        <Route path="/game-log/:id" element={ <GameLog /> } />
                    </Routes>
                </div>
            </main>
        </UserProvider>
    );
}

export default App;
