/*Importacion de express*/
const express = require('express');

/*Metodo router de express guardado en un a costante para poder utilizarlo*/
const router = express.Router();

/*Importamos controladores de autenticacion*/
const { registerUser, 
        login, 
        getProfile,
        getAllUsers,
        getUserById,
        createUser,
        deleteUserById,
        editUserById } = require('../controllers/authController');

/*Importamos middlewares de verificacion*/
const { verifyToken, 
        verifyRole } = require('../middlewares/verifyAuth');


// Ruta para el registro de usuarios
router.post('/register', registerUser);

// Ruta para el login
router.post('/login', login);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', verifyToken, getProfile);

// Ruta para obtener todos los usuarios
router.get('/users', getAllUsers);

// Ruta para obtener un usuario por id
router.get('/usersid/:id', getUserById);

// Ruta para crear un usuario
router.post('/createuser', createUser);

// Ruta para eliminar un usuario
router.delete('/deleteuser/:id', deleteUserById);


// Ruta para eliminar un usuario
router.put('/edituser/:id', editUserById);

// Exportamos las rutas
module.exports = router;