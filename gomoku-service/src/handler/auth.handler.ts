/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import validateSchema from '../middleware/validateSchema'
import { createUser, getUserByUsername } from '../service/auth.service'
import { LoginInput, RegisterInput, loginSchema, registerSchema } from '../schema/auth.schema'
import { signJwt } from '../util/jwt'

const authHandler = express.Router()

/**
 * Handles user registration.
 */
authHandler.post(
    '/register',
    validateSchema(registerSchema),
    async (req: Request<{}, {}, RegisterInput['body']>, res: Response) => {
        try {
            const { username, password } = req.body

            // Check if user already exists in the database
            const existingUser = await getUserByUsername(username)

            if (existingUser) {
                return res.status(409).send('User Already Exist. Please Login')
            }

            // Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10)

            // Create user in the database
            const newUser = await createUser({
                username,
                password: encryptedPassword,
            })

            // Create token
            const token = signJwt({ username, _id: newUser._id })

            // Return new user with token
            return res.status(200).json({ _id: newUser._id, token })
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
)

/**
 * Handles user login.
 */
authHandler.post(
    '/login',
    validateSchema(loginSchema),
    async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
        try {
            // Get user input
            const { username, password } = req.body

            // Retrieve user from the database
            const user = await getUserByUsername(username)

            // Check if user exists and compare passwords
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = signJwt({ username, _id: user._id })
                
                // Return user info with token
                return res.status(200).json({ _id: user._id, token })
            }
            return res.status(400).send('Invalid Credentials')
        } catch (error) {
            return res.status(500).send(error)
        }
    }
)

export default authHandler
