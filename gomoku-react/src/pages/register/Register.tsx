/**
 * This file is based off the lectures/tutorials by Le Kang.
 */

import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context'
import { Message } from '../../components';

import style from './Register.module.css'

/**
 * Represents the register form component.
 */
export default function Register() {

    const { register } = useContext(UserContext);
    const usernameInput = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    /**
     * Handles user registration. If registration is successful, navigate to the home page
     * otherwise, display an error message.
     */
    const handleRegister = async () => {
        setErrorMessage('');

        // Ensure passwords match
        if (password !== passwordConfirmation) {
            setErrorMessage('Passwords do not match');
            return;
        }
        
        const result = await register(username, password);
        
        // Navigate to home page if successful
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
            handleRegister();
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
                value={username}
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

            <div className={ style.inputGroup }>
            <label htmlFor="passwordConfirmation" className={ style.label }>
                Confirm Password
            </label>
            <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                className={ style.input }
                placeholder="Enter your password"
                value={ passwordConfirmation }
                onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                setErrorMessage('');
                }}
            />
            </div>
            <button
                type="submit" 
                className={ style.button } 
                disabled={ !username || !password || !passwordConfirmation }
            >
                Login
            </button>
            { errorMessage && <Message variant="error" message={ errorMessage } /> }
        </form>
    )
}
