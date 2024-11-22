/*Importacion de express*/
const express = require('express');

/*Metodo router de express guardado en un a costante para poder utilizarlo*/
const router = express.Router();

/*Importamos controladores de autenticacion*/
const { registerUser, 
        login, 
        getProfile } = require('../controllers/authController');

/*Importamos middlewares de verificacion*/
const { verifyToken, 
        verifyRole } = require('../middlewares/verifyAuth');


// Ruta para el registro de usuarios
router.post('/register', registerUser);

// Ruta para el login
router.post('/login', login);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', verifyToken, getProfile);

// Exportamos las rutas
module.exports = router;