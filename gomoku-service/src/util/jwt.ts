/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import jwt, { SignOptions } from 'jsonwebtoken'

/**
 * Generates a JSON Web Token (JWT) with the provided payload and options.
 * @param {Object} payload - The payload to include in the JWT.
 * @param {SignOptions} options - Optional JWT signing options.
 * @returns {string} - The generated JWT.
 */
export const signJwt = (payload: Object, options: SignOptions = {}) => {
    const privateKey = process.env.accessTokenPrivateKey as string
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
        expiresIn: '8h',
    })
}

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded payload.
 * @param {string} token - The JWT to verify.
 * @returns {T | null} - The decoded payload if verification is successful, or null if verification fails.
 */
export const verifyJwt = <T>(token: string): T | null => {
    try {
        const publicKey = process.env.accessTokenPublicKey as string
        return jwt.verify(token, publicKey) as T
    } catch (error) {
        return null
    }
}
