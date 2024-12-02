import express from 'express'
import { verifyToken } from './varifyTokenMiddleware.js'
import { getAllUSers } from '../services/getAllUsers.js'

const adminRoutes = express.Router()

adminRoutes.get('/panel', verifyToken, async (req, res) => {
  if (req.user.role === 'admin') {
    const allUsers = await getAllUSers()
    console.log(allUsers)
    return res.render('admin/panel.ejs', { allUsers })
  } else {
    return res.json('acceso no autorizado')
  }
})

export { adminRoutes }
