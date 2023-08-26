/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import mongoose from 'mongoose'
import UserModel, { UserInput } from '../model/user.model'

/**
 * Retrieves a user by their username.
 * @param {string} username - The username to search for.
 * @returns {Promise<object | null>} - A promise that resolves to the user object, or null if not found.
 */
export async function getUserByUsername(username: string) {
    return UserModel.findOne({ username }).lean()
}

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<object | null>} - A promise that resolves to the user object, or null if not found.
 */
export async function getUserById(id: string) {
    return UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean()
}

/**
 * Creates a new user.
 * @param {UserInput} user - The user object to create.
 * @returns {Promise<object>} - A promise that resolves to the created user object.
 */
export async function createUser(user: UserInput) {
    return UserModel.create(user)
}