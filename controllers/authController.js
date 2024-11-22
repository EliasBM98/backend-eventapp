const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para manejar tokens JWT
const { registerUserModel,
        getUserByEmailModel,
        getProfileInfoModel
} = require('../models/authModel')

// Controlador para registrar usuarios
const registerUser = async (req, res) => {
  const { name, 
          surname, 
          email, 
          password, 
          role } = req.body;

  // Validamos que se envíen todos los campos
  if (!name || !password || !role) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    //TO DO: Hcer llamada para traer usuario por email y si existe return error 401-403 "email ya existe" si no continua.
    
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la base de datos
    const registeredUser = await registerUserModel( name, 
                                                    surname, 
                                                    email, 
                                                    hashedPassword, 
                                                    role);
    if(registeredUser){
      return res.status(201).json({ 
        ok: true,
        msg: 'Usuario registrado',
        userId: registeredUser[0].id });
    }else{
      return res.status (400).json({
        ok: false,
        msg: 'No se ha registrado el usuario'
    });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ 
      ok: false,
      message: 'Error al registrar el usuario'});
  };
};



// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;


// Validamos que se envíen todos los campos
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscamos el usuario en la base de datos
    const result = await getUserByEmailModel(email);



    if(result.length === 0){
      return res.status(400).json({
        ok: false,
        msg: 'No se ha encontrado el usuario'
    })
  }
  const user = result[0];
  console.log(result, 'en login')

    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
console.log(process.env.JWT_SECRET)
    // Generamos un token JWT con el id del usuario y su rol
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });

  } catch(error){
    console.log(error, 'en catch auth model login')
    return res.status(500).json({ 
      ok: false,
      message: 'Error al iniciar sesion' });
  }
};



// Controlador para obtener el perfil del usuario
const getProfile = async (req, res) => {
  try {
    // Obtenemos los datos del usuario desde la base de datos
    const result = await getProfileInfoModel(req.user.userId);

    res.json(result[0]);
  } catch (error) {
    console.log(error, 'en error get profile')
    res.status(500).json({ 
      ok: false,
      msg: 'Error al obtener el perfil' });
  }
};


/*Exportacion controladores*/
module.exports = {  registerUser, 
                    login, 
                    getProfile }

