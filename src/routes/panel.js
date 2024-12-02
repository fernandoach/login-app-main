import express from 'express'
import { verifyToken } from './varifyTokenMiddleware.js'
import { getUserByUsername } from '../services/getUserByUsername.js'

const panelRoutes = express.Router()

panelRoutes.get('/', verifyToken, async (req, res) => {
  if (req.user.role === 'user') {
    const userData = await getUserByUsername(req.user.usuario)
    return res.render('panel/index.ejs', { userData })
  } else {
    return res.json('Acceso denegado')
  }
})

export { panelRoutes }
