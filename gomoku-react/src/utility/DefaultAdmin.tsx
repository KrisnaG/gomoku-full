/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import bcrypt from 'bcryptjs';
import { User } from '../types';

/**
 * Creates the default admin user if it doesn't exist in the 'users' array and adds it using 'setUsers' function.
 * At this stage an admin user does not have any special privileges compared to an ordinary user.
 * @param users The array of users containing existing user data.
 * @param setUsers The function to update the 'users' array and persist the new admin user.
 */
export default function createDefaultAdmin(users: User[], setUsers: (users: User[]) => void) {
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin';

    // Check if the default admin user already exists in the 'users' array
    const adminUser = users.find((u) => u.username === ADMIN_USERNAME);

    // If the default admin user doesn't exist, create and add it to the 'users' array using 'setUsers'
    if (!adminUser) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, salt);

        const newAdminUser: User = {
            username: ADMIN_USERNAME,
            password: hashedPassword,
        };

        setUsers([...users, newAdminUser]);
    }
};
