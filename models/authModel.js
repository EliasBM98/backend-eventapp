/*Importacion conexion a base de datos*/
const { connect } = require('../helpers/bbddconnect');


/*Importacion queris sql*/
const { auth } = require('./queries');


/**
 * Funcion para registrar nuevos usuarios.
 * 
 * @param {String} name - Nombre del usuario.
 * @param {String} surname - Apellido del usuario.
 * @param {String} email - Correo electronico del usuario.
 * @param {String} password - Constraseña del usuario.
 * @param {String} role - Rol que va a tener el usuario en la aplicacion.
 * @param {String} job_position - Puesto de trabajo del usuario.
 * @param {String} user_function - Descripción de las funciones del puesto de trabajo.
 * @returns {Object} - Usuario creado.
 */
const registerUserModel = async (name, surname, email, password, role, job_position, user_function) => {
    try {
        let data = await connect(auth.createUsers, [name, surname, email, password, role, job_position, user_function]);
        if(data){
            //console.log(data.rows);
            return data.rows;
        } else {
            throw error
        }    
    } catch (error) {
        console.log(error)
    }
};


/**
 * Funcion para obtener un usuario por su email.
 * 
 * @param {String} email - Email del usuario.
 * @returns {Object} - Usuario encontrado con ese email.
 */
const getUserByEmailModel = async (email) => {
    try {
        let data = await connect(auth.getUserByEmail, [email]);
        if (data){
            //console.log(data.rows);
            return data.rows;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};


/**
 * Funcion para encontrar un usuario y su información por el id.
 * 
 * @param {Number} id - Id del usuario.
 * @returns {Object} - Usuario encontrado con ese id.
 */
const getProfileInfoModel = async (id) => {
    try {
        let data = await connect(auth.getProfileInfo, [id]);
        if (data){
            //console.log(data.rows);
            return data.rows[0];
        } else {
            throw error
        }    
    } catch (error) {
        console.log(error);
        return error;
    }
};



/**
 * Funcion para obtener todos los usuarios.
 * 
 * @returns {Object} - Devuelve todos los usuarios en la bbdd.
 */
const getAllUsersModel = async () => {
    try {
        let data = await connect(auth.getAllUsers);
        if (data){
            // console.log(data.rows,'en getAllEventsModel');
            return data.rows;
        } else{
            throw error
        }
    } catch (error) {
        console.log(error)
        return error;
    }
};


/**
 * Funcion para registrar nuevos usuarios.
 * 
 * @param {String} name - Nombre del usuario.
 * @param {String} surname - Apellido del usuario.
 * @param {String} email - Correo electronico del usuario.
 * @param {String} password - Constraseña del usuario.
 * @param {String} role - Rol que va a tener el usuario en la aplicacion.
 * @param {String} job_position - Puesto de trabajo del usuario.
 * @param {String} user_function - Descripción de las funciones del puesto de trabajo.
 * @returns {Object} - Usuario creado.
 */
const createUsersModel = async (name, surname, email, password, role, job_position, user_function) => {
    try {
        let data = await connect(auth.createUsers, [name, surname, email, password, role, job_position, user_function])
        if (data){
            console.log(data.rows);
            return data.rows;
        } else{
            throw error;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
};



/**
 * Elimina un usuario por id
 * 
 * @param {number} id - ID del usuario que se va a eliminar.
 * @returns {Object} - Resultado de  la eliminación.
 */
const deleteUserModel = async (id) => {
    try {
        let data = await connect(auth.deleteUser, [id]);
        if(data){
            console.log(data.rows);
            return data.rows
        } else{
            throw error
        }
    } catch (error) {
        console.log(error)
    }
};


/**
 * Edita usuario por su id.
 * 
 * @param {number} id - Id del usuario.
 * @param {String} name - Nombre del evento.
 * @param {String} surname - Apellido del usuario.
 * @param {String} email - Email del usuario. 
 * @param {String} password - Contraseña del usuario.
 * @param {String} role - Rol del usuario.
 * @param {String} job_position - Puesto de trabajo del usuario.
 * @param {String} user_function - Función que desempeña el usuario.
 * @returns {Object} - Evento editado.
 */
const editUserModel = async (id, name, surname, email, password, role, job_position, user_function) =>{
    try {
        let data = await connect(auth.editUsers, [id, name, surname, email, password, role, job_position, user_function]);
        if (data){
            console.log(data.rows);
            return data.rows;
        } else{
            throw error
        }
    } catch (error) {
        console.log(error);
    }  
};




module.exports={
    registerUserModel,
    getUserByEmailModel,
    getProfileInfoModel,
    getAllUsersModel,
    createUsersModel,
    deleteUserModel,
    editUserModel
}

    