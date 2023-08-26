/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { useEffect } from 'react';

import { User, UserCredential } from '../../types';
import { UserContext } from '../../context';
import { useLocalStorage } from '../../hooks';
import { setToken, post } from '../../utility';
import { API_HOST } from '../../constants';


/**
 * The UserProviderProps interface specifies the type of the props expected by the UserProvider component.
 */
type UserProviderProps = {
    children: React.ReactNode;
};

/**
 * Manages user-related data and authentication logic.
 * @param param0 The props for the UserProvider component.
 * @returns Returns the UserProvider component.
 */
export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
    if (user) {
        setToken(user.token)
    }

    // Store the 'user' information in local storage to persist the login status across page refreshes.
    useEffect(() => {
        if (user) {
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            window.localStorage.removeItem('loggedInUser');
        }
    }, [user]);

    /**
     * Handles user login.
     * @param username The username provided by the user during login.
     * @param password The password provided by the user during login.
     * @returns Returns true if login is successful, or an error message as a string if login fails.
     */
    const login = async (username: string, password: string) => {
        try {
            const user = await post<UserCredential, User>(`${API_HOST}/auth/login`, {
                username,
                password
            });
            setUser(user);
            setToken(user.token);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Unable to login at this moment, please try again';
        }
    };

    /**
     * Handles user registration.
     * @param username The new username provided by the user during registration.
     * @param password The new password provided by the user during registration.
     * @returns Returns true if registration is successful, or an error message as a string if registration fails.
     */
    const register = async (username: string, password: string) => {
        try {
            const user = await post<UserCredential, User>(`${API_HOST}/auth/register`, {
                username,
                password
            });
            setUser(user);
            setToken(user.token);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Unable to register at this moment, please try again';
        }
    };

    /**
     * Handles user logout. Clears the current user state, effectively logging the user out.
     */
    const logout = () => {
        setUser(undefined);
        setToken('');
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}
