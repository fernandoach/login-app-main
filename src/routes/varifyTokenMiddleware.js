import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.redirect('/auth/login')
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    return res.redirect('/auth/login')
  }
}

export { verifyToken }
