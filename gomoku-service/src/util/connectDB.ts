/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import mongoose from 'mongoose'

/**
 * Establish a connection to the database.
 */
const connectDB = async () => {
    const dbUri = process.env.dbURI || ''
    console.log(`⚡️[server]: Connecting to DB...`)
    try {
        await mongoose.connect(dbUri)
    } catch (error) {
        console.log('⚡️[server]: Could not connect to db')
        console.log(error)
        process.exit(1)
    }
}

export default connectDB