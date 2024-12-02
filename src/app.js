import express from 'express'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { authRoutes } from './routes/auth.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { panelRoutes } from './routes/panel.js'
import { adminRoutes } from './routes/admin.js'

// config dotenv
dotenv.config()

// filename y dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = express()

// middleware's
server.use(express.json())
server.set('view engine', 'ejs')
server.use(express.static('public'))
server.set('views', join(__dirname, 'views'))
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

// routes
server.use('/panel', panelRoutes)
server.use('/auth', authRoutes)
server.use('/admin', adminRoutes)

// endpoints
server.get('/', (req, res) => {
  return res.render('index.ejs')
})

// listener
server.listen(3000, () => {
  console.log('server on => http://localhost:3000')
})
