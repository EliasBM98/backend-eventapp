const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ 
      ok:false,
      message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del token en req.user
    console.log(req.user, 'en verify auth')
    next();
  } catch (error) {
    res.status(401).json({ 
      ok:false,
      message: 'Token inválido' });
  }
};

// Middleware para verificar roles específicos
const verifyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ 
      ok:false,
      message: 'No tienes permiso para realizar esta acción' });
  }
  next();
};

module.exports = { verifyToken, verifyRole }