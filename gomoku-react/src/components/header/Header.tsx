/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context";

import style from './Header.module.css';

/**
 * Header component that displays the navigation links and title.
 */
export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    // Render the elements for a logged-in user.
    const getUserIsLoggedIn = () => {
        return (
            <>
                <button 
                    className={ style.actionButton } 
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                >
                    Logout
                </button>
                <button 
                    className={ style.actionButton } 
                    onClick={ () => navigate('/games') }>
                    Previous Games
                </button>
            </>
        );
    }

    // Render the elements for a logged-out user.
    const getUserIsLoggedOut = () => {
        return (
            <>
                <button 
                    className={ style.actionButton } 
                    onClick={ () => navigate('/login') }
                >
                    Login
                </button>
                <button 
                    className={ style.actionButton } 
                    onClick={ () => navigate('/register') }
                >
                    Register
                </button>

            </>
        );
    }

    // Get the elements for navigation actions (buttons to login and view previous games)
    const getNavigateAction = () => {
        return user ? getUserIsLoggedIn() : getUserIsLoggedOut();
    };

    return (
        <header className={ style.header }>
            <div className={ style.container }>
                <Link className={ style.title } to="/">Gomoku</Link>
                <div className={ style.navigation }>{ getNavigateAction() }</div>
            </div>
        </header>
    );
}
