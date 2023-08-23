/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';

import { User } from '../../types';
import { UserContext } from '../../context';
import { useLocalStorage } from '../../hooks';
import createDefaultAdmin from '../../utility/DefaultAdmin';

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
    const [users, setUsers] = useLocalStorage<User[]>('users', []);
    const [user, setUser] = useState<User | undefined>(() => {
        // Retrieve the user from local storage on initial mount
        const storedUser = window.localStorage.getItem('loggedInUser');
        return storedUser ? JSON.parse(storedUser) : undefined;
    });
    
    // Create the default admin user if it doesn't exist when the component mounts.
    useEffect(() => {
        createDefaultAdmin(users, setUsers);
    }, [users, setUsers]);

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
            const foundUser = users.find(
                (u) => u.username === username && verifyPassword(password, u.password)
            );
            if (foundUser) {
                setUser(foundUser);
                return true;
            } else {
                return 'Invalid username or password';
            }
        } catch (error) {
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
            // Check if the username already exists
            if (users.some((u) => u.username === username)) {
                return 'Username already exists';
            }

            // Generate a random salt for the user
            const salt = bcrypt.genSaltSync(10);

            // Hash the password with the salt
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser: User = {
                username: username,
                password: hashedPassword,
            };

            // Save the new user to the users array
            setUsers([...users, newUser]);
            setUser(newUser);
            return true;
        } catch (error) {
            return 'Unable to register at this moment, please try again';
        }
    };

    /**
     * Handles user logout. Clears the current user state, effectively logging the user out.
     */
    const logout = () => {
        setUser(undefined); // Use setUser to clear the user state
    };

    /**
     * Verify the provided password against the hashed password using bcrypt.
     * @param password The password provided by the user during login.
     * @param hashedPassword The hashed password retrieved from the stored user data.
     * @returns Returns true if the password is verified, or false otherwise.
     */
    const verifyPassword = (password: string, hashedPassword: string) => {
        return bcrypt.compareSync(password, hashedPassword);
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}
