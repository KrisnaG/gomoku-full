/**
 * This file is based off the lectures/tutorials by Le Kang.
 */

import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context'
import { Message } from '../../components';

import style from './Login.module.css'

/**
 * Represents the login form component.
 */
export default function Login() {
    const { login } = useContext(UserContext);
    const usernameInput = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    /**
     * Handles user login. If login is successful, navigate to the home page
     * otherwise, display an error message.
     */
    const handleLogin = async () => {
        setErrorMessage('');
        const result = await login(username, password);
        if (result === true) {
            navigate('/');
        } else {
            setErrorMessage(result as string);
        }
    }

    /**
     * Focus on the username input field when the component mounts.
     */
    useEffect(() => {
        if (usernameInput.current) {
            usernameInput.current.focus();
        }
    }, [])

    return (
        <form
            className={ style.container }
            onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}
        >
            <div className={ style.inputGroup }>
            <label htmlFor="username" className={ style.label }>
                Username
            </label>
            <input
                ref={ usernameInput }
                id="username"
                name="username"
                className={ style.input }
                placeholder="Enter your username"
                value={ username }
                onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage('');
                }}
            />
            </div>
            <div className={ style.inputGroup }>
            <label htmlFor="password" className={ style.label }>
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                className={ style.input }
                placeholder="Enter your password"
                value={ password }
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                }}
            />
            </div>
            <button 
                type="submit" 
                className={ style.button } 
                disabled={ !username || !password }
            >
                Login
            </button>
            { errorMessage && <Message variant="error" message={errorMessage} /> }
        </form>
    )
}