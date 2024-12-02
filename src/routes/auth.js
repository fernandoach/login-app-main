import express from 'express'
import { getAllUSers } from '../services/getAllUsers.js'
import { createUser } from '../services/createUser.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../services/getUserByUsername.js'

const authRoutes = express.Router()

authRoutes.get('/login', (req, res) => {
  return res.render('auth/login.ejs')
})

authRoutes.post('/login', async (req, res) => {
  try {
    const { usuario, passwd } = req.body
    const user = await getUserByUsername(usuario)
    const compare = await bcrypt.compare(passwd, user[0].passwd)
    if (compare === false) {
      return res.redirect('/auth/login')
    }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ usuario: user[0].usuario, role: user[0].role }, secret, { expiresIn: '1h' })
    res.cookie('jwt', token, { httpOnly: true })
    if (user[0].role === 'admin') {
      return res.redirect('/admin/panel')
    } else {
      return res.redirect('/panel/')
    }
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

authRoutes.get('/register', (req, res) => {
  return res.render('auth/register.ejs')
})

authRoutes.post('/register', async (req, res) => {
  try {
    const { nombre, edad, usuario, passwd } = req.body
    console.log(nombre, edad, usuario, passwd)
    const users = await getAllUSers()
    const findUser = users.findIndex(o => o.usuario === usuario)
    if (findUser === -1) {
      const hashedPassword = await bcrypt.hash(passwd, 12)
      await createUser(nombre, edad, usuario, hashedPassword, 'user')
      return res.redirect('/auth/login')
    }
    return res.redirect('/auth/register')
  } catch (err) {
    return res.json(err)
  }
})

export { authRoutes }
