import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from './controllers/ClerkWebhooks.js'; 

const app = express()
app.use(cors());
app.use(clerkMiddleware())

app.use("/api/clerk", ClerkWebhooks)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB()
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})