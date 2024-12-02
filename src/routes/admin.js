import express from 'express'
import { getAllUSers } from '../services/getAllUsers.js'
import { varifyToken } from './varifyTokenMiddleware.js'

const router = express.Router()

router.get('/panel', varifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.redirect('/panel')
    }
    const allUsers = await getAllUSers()
    return res.render('admin/panel', { allUsers })
  } catch (error) {
    console.error(error)
    return res.redirect('/auth/login')
  }
})

export { router as adminRoutes }
