import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectDB from './config/db.js';

const app = express()
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB()
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})