const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para manejar tokens JWT
const { registerUserModel,
        getUserByEmailModel,
        getProfileInfoModel,
        getAllUsersModel,
        createUsersModel,
        deleteUserModel,
        editUserModel
} = require('../models/authModel')


/**
 * Controlador para registrar usuarios.
 * 
 * @param {Object} req - Solicitud.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Objeto con la respuesta. 
 */
const registerUser = async (req, res) => {
  const { name, 
          surname, 
          email, 
          password, 
          role, 
          job_position, 
          user_function } = req.body;

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
                                                    role,
                                                    job_position, 
                                                    user_function);
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


/**
 * Controlador para iniciar sesión
 * 
 * @param {Object} req - Solicitud.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Objeto con la respuesta.
 */
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


/**
 * Controlador para obtener usuario por id.
 * 
 * @param {Object} req - Solicitud con el id.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
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

/**
 * COntrolador para obtener todos los usuarios.
 * 
 * @param {Object} req - Solicitud.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Objeto JSON con todos los usuarios.
 */
const getAllUsers = async (req, res) => {

  try {
  let users = await getAllUsersModel();
      if(users){
      return res.status(200).json({
              ok: true,
              msg: 'Obteniendo todos los usuarios',
              data: users,
              total_pages: users.length
          })
      } else{
          return res.status (400).json({
              ok:false,
              msg: 'No se han obtenido usuarios'
          })
      }
  } catch (error) {
      console.log (error);
      return res.status(500).json({
          ok: false,
          msg: 'Error en la conexion'
      })
  }
};


/**
 * Controlador para obtener usuario por id.
 * 
 * @param {Object} req - Solicitud con el id.
 * @param {Object} res - Respuesta.
 * @returns {Object} - Objeto JSON con la respuesta.
 */
const getUserById = async (req, res) => {
  let user;
  try {
      const id = req.params.id;
      user = await getProfileInfoModel(id)
      if(user){
          return res.status(200).json({
              ok: true,
              msg: 'Obteniendo Usuario',
              data: user
          })
      }else{
          return res.status(400).json({
              ok:false,
              msg: 'No se han obtenido el usuario'
          })
      }
  } catch (error) {
      console.log (error);
      return res.status(500).json({
          ok: false,
          msg: 'Error en la conexion'
      })
  }
};

/**
 * Controlador para crear usuarios.
 * 
 * @param {Object} req - Solicitud 
 * @param {Object} res - Respuesta.
 * @returns {Object} - Respuesta con el objeto JSON del usuario creado.
 */
const createUser = async (req, res) => {
  const {name, surname, email, password, role, job_position, user_function} = req.body;
  try {
      const userSaved = await createUsersModel(name, surname, email, password, role, job_position, user_function);
      if(userSaved){
          return res.status(201).json({
              ok: true,
              msg: 'Usuario creado',
              data: userSaved
          })
      }else{
          return res.status (400).json({
              ok:false,
              msg: 'No se ha creado el usuario'
          })
      }
  } catch (error) {
      console.log (error);
      return res.status(500).json({
          ok: false,
          msg: 'Error en la conexion, error al crear el usuario'
      })   
  }
};


/**
 * Controlador para eliminar un usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const deleteUserById = async (req, res) => {

  try {
      const id = req.params.id;
      const deletedUser = await deleteUserModel(id);
      if(deletedUser){
          return res.status(200).json({
              ok: true,
              msg: 'Usuario eliminado',
              data: deletedUser
          });
      }else{
          return res.status(404).json({
              ok: false,
              msg: "Usuario no encontrado"
          })
      }
  } catch (error) {
      return res.status(500).json({
          ok: false,
          msg: 'Error en la conexion, error al eliminar el usuario'
      })
  }
};


/**
 * Controlador para editar un usuario.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const editUserById = async (req, res) => {
  const {id, name, surname, email, password, role, job_position, user_function}  = req.body;

  try {
      const id = req.params.id;
      const eventEdited = await editUserModel(id, name, surname, email, password, role, job_position, user_function);
      if(eventEdited){
          return res.status(200).json({
              ok:true,
              msg: 'Usuario editado',
              data: eventEdited
          })
      }else{
          return res.status(404).json({
              ok: false,
              msg: "Usuario no encontrado"
          })
      }
  } catch (error) {
      console.log(error)
      return res.status(500).json({
          ok: false,
          msg: 'Error en la conexion, error al editar el usuario'
      })
  }
};



/*Exportacion controladores*/
module.exports = {  registerUser, 
                    login, 
                    getProfile,
                    getAllUsers,
                    getUserById,
                    createUser,
                    deleteUserById,
                    editUserById}

