import express from 'express'
import { createUser } from '../services/createUser.js'
import { getUserByUsername } from '../services/getUserByUsername.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', async (req, res) => {
  try {
    const { nombre, edad, usuario, passwd } = req.body
    const hashedPassword = await bcrypt.hash(passwd, 10)
    await createUser(nombre, edad, usuario, hashedPassword, 'user')
    res.redirect('/auth/login')
  } catch (error) {
    console.error(error)
    res.redirect('/auth/register')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { usuario, passwd } = req.body
    const user = await getUserByUsername(usuario)

    if (user.length === 0) {
      return res.redirect('/auth/login')
    }

    const validPassword = await bcrypt.compare(passwd, user[0].passwd)
    if (!validPassword) {
      return res.redirect('/auth/login')
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.cookie('token', token, { httpOnly: true })

    if (user[0].role === 'admin') {
      return res.redirect('/admin/panel')
    }
    return res.redirect('/panel')
  } catch (error) {
    console.error(error)
    res.redirect('/auth/login')
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/auth/login')
})

export { router as authRoutes }
