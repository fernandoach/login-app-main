import express from 'express'
import { varifyToken } from './varifyTokenMiddleware.js'
import { getUserByUsername } from '../services/getUserByUsername.js'
import { updateUser } from '../services/updateUser.js'

const router = express.Router()

router.get('/', varifyToken, async (req, res) => {
  try {
    const userData = await getUserByUsername(req.user.username)
    return res.render('panel/index', { userData })
  } catch (error) {
    console.error(error)
    return res.redirect('/auth/login')
  }
})

router.post('/update', varifyToken, async (req, res) => {
  try {
    const { nombre, edad, usuario } = req.body
    await updateUser(req.user.id, nombre, edad, usuario)
    res.redirect('/panel')
  } catch (error) {
    console.error(error)
    res.redirect('/panel')
  }
})

export { router as panelRoutes }
