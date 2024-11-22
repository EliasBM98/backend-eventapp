/*Importacion conexion a base de datos*/
const { connect } = require('../helpers/bbddconnect');

/*Importacion queris sql*/
const { auth } = require('./queries');

const registerUserModel = async (name, surname, email, password, role) => {
    try {
        let data = await connect(auth.createUsers, [name, surname, email, password, role]);
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

const getProfileInfoModel = async (id) => {
    try {
        let data = await connect(auth.getProfileInfo, [id]);
        if (data){
            //console.log(data.rows);
            return data.rows;
        } else {
            throw error
        }    
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports={
    registerUserModel,
    getUserByEmailModel,
    getProfileInfoModel
}

    