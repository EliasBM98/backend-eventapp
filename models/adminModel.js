/*Importacion conexion a base de datos*/
const { connect } = require('../helpers/bbddconnect');

/*Importacion queris sql*/
const { events } = require('./queries');


/**
 * Hace una consulta a la base de datos y obtiene todos los eventos
 * 
 * @returns {Object} - Devuelve todos los eventos.
 */
const getAllEventsModel = async (page) => {
    try {
        let data = await connect(events.getAllEvents, [page]);
        if (data){
            console.log(data.rows);
            return data.rows;
        } else{
            
        }
    } catch (error) {
        console.log(error)
    }
};


/**
 *Funcion para obtener un evento por su Nombre
 *  
 * @param {String} Name - Nombre del evento que se quiere encontrar.
 * @returns {Object} - Eventos encontrados con ese nombre.
 */
const getEventsByNameModel = async (name) => {
    try {
        let data = await connect(events.getEventsByName, [name]);
        if (data) {
            console.log(data.rows);
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
 * Crea nuevos eventos.
 * 
 * @param {String} name - Nombre del evento.
 * @param {String} description - Descripcion del evento.
 * @param {Date} year - Año en el que se contrata el evento.
 * @param {Date} start_date - Fecha de inicio del evento (desde montaje).
 * @param {Date} end_date  - Fecha en la que termina el evento (al fin de desmontaje).
 * @param {String} event_phase - Fase en la que se encuentra el evento.
 * @param {String} event_type - Tipo de evento.
 * @param {String} enterprise - Empresa que contrata el evento.
 * @param {String} chief - Lider de equipo qu se encarga del evento.
 * @returns {Object} - Evento creado.
 */
const createEventsModel = async (name, description, year, start_date, end_date, event_phase, event_type, enterprise,chief) => {
    try {
        let data = await connect(events.createEvents, [ name, description, year, start_date, end_date, event_phase, event_type, enterprise, chief])
        if (data){
            console.log(data.rows);
            return data.rows;
        } else{
            throw error;
        }
    } catch (error) {
        console.log(error)
    }
};


/**
 * Elimina un evento por id
 * 
 * @param {number} id - ID del evento que se va a eliminar.
 * @returns {Object} - Resultado de  la eliminación.
 */
const deleteEventsModel = async (id) => {
    try {
        let data = await connect(events.deleteEvents, [id]);
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
 * Edita evento por su id.
 * 
 * @param {number} id - Id del evento.
 * @param {String} name - Nombre del evento.
 * @param {String} description - Descripcion del evento.
 * @param {Date} year - Año en el que se contrata el evento.
 * @param {Date} start_date - Fecha de inicio del evento (desde montaje).
 * @param {Date} end_date  - Fecha en la que termina el evento (al fin de desmontaje).
 * @param {String} event_phase - Fase en la que se encuentra el evento.
 * @param {String} event_type - Tipo de evento.
 * @param {String} enterprise - Empresa que contrata el evento.
 * @param {String} chief - Lider de equipo qu se encarga del evento.
 * @returns {Object} - Evento editado.
 */
const editEventsModel = async (id, name, description, year, start_date, end_date, event_phase, event_type, enterprise, chief) =>{
    try {
        let data = await connect(events.editEvents, [id, name, description, year, start_date, end_date, event_phase, event_type, enterprise, chief]);
        if (data){
            console.log(data.rows);
            return data.rows;
        } else{
            throw error
        }

    } catch (error) {
        console.log(error);
    }
    
}


/*Exportacion modelos*/
module.exports={
                getAllEventsModel,
                getEventsByNameModel,
                createEventsModel,
                deleteEventsModel,
                editEventsModel
}