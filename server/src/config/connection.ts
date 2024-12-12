// import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// dotenv.config()

// const MONGODB_URI = process.env.MONGODB_URI || ''

// const db = async (): Promise<typeof mongoose.connection> => {
//     try {
//         await mongoose.connect(MONGODB_URI)
//         console.log('Database connected')
//         return mongoose.connection
//     } catch (error) {
//         console.error('Database error', error)
//         throw new Error('Database error')
//     }
// }

// export default db

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks');
const db = mongoose.connection;
export default db;