import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import colors from 'colors'
import asyncHandler from 'express-async-handler'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
// import counterRoutes from './routes/counterRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const getCounts = asyncHandler(async (req, res) => {
  try {
      const data = JSON.parse(fs.readFileSync('counts.json'));
      res.json(data);
      return;
  }catch(e) {
      res.json([])
  }    
})

const postCounts = asyncHandler(async (req, res) => {
  let data = []
  try {
      data = JSON.parse(fs.readFileSync('counts.json'));
  }catch(e) {
  }
  data.push({
      wardrobe: "",
      timestamp: new Date().toISOString()
  })
  fs.writeFileSync("counts.json", JSON.stringify(data))
  res.json({status: 'ok'})
})

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.post("/api/counter", postCounts)
app.get("/api/counter", getCounts)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
