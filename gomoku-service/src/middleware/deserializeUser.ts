/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import { NextFunction, Request, Response } from 'express'
import { getUserById } from '../service/auth.service'
import { verifyJwt } from '../util/jwt'

// Extend the Request interface with custom userId property.
declare global {
    namespace Express {
      interface Request {
        userId: string;
      }
    }
}

// Define the structure of a JWT token payload
interface TokenBody {
    username: string
    _id: string
    iat: number
    exp: number
}

/**
 * Middleware function to deserialize a user from a JWT token.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express NextFunction to call the next middleware.
 * @returns - Calls the next middleware if successful; otherwise, sends an error response.
 */
export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        try {
            // Get the token
            let token
            if (
                req.headers.authorization?.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1]
            }

            if (!token) {
                return res.status(403).send('Token missing')
            }

            // Validate Access Token
            const decoded = verifyJwt<TokenBody>(token)

            if (!decoded) {
                return res.status(401).send('Invalid token')
            }

            // Retrieve the user associated with the decoded user ID
            const user = await getUserById(decoded._id)

            if (!user) {
                return res.status(401).send('Invalid user')
            }

            // Inject the user ID into the request for future middleware or route handlers
            req.userId = user._id

            // Continue to the next middleware or route handler
            next()
        } catch (err: any) {
            next(err)
        }
    }