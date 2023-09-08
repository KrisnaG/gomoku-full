/**
 * The file is based on the material from lectures/tutorials by Yihan Lu and Le Kang.
 */

import 'dotenv/config'
import connect from './connectDB'
import bcrypt from 'bcryptjs'
import UserModel from '../model/user.model'
import users from '../data/user.json'
import games from '../data/games.json'
import GameModel from '../model/game.model'

/**
 * Perform the database setup.
 */
const run = async () => {
    try {
        await connect()

        // Iterate through each user in the array and hash their passwords
        users.forEach(async (user) => {
            user.password = await bcrypt.hash(user.password, 10)
        })
        
        // Users
        await UserModel.deleteMany()
        await UserModel.insertMany(users)

        // Games
        await GameModel.deleteMany()
        await GameModel.insertMany(games)

        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

run()