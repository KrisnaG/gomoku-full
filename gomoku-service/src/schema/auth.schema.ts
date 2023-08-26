/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import { object, string, TypeOf } from 'zod'

/**
 * Defines the payload schema for request body data.
 */
const payload = {
    body: object({
        username: string({
        required_error: 'Username is required',
        }),
        password: string({
        required_error: 'Password is required',
        }),
    }),
}

/**
 * Schema for user registration input data.
 */
export const registerSchema = object({
    ...payload,
})

/**
 * Schema for user login input data.
 */
export const loginSchema = object({
    ...payload,
})

/**
 * Type definition for the data expected in user registration requests.
 */
export type RegisterInput = TypeOf<typeof registerSchema>

/**
 * Type definition for the data expected in user login requests.
 */
export type LoginInput = TypeOf<typeof loginSchema>