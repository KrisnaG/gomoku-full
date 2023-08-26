/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

/**
 * Represents user credentials information with a username and password.
 */
export type UserCredential = {
    username: string,
    password: string
}

/**
 * Represents a user with a unique identifier and an authentication token.
 */
export type User = {
    _id: string,
    token: string
}
