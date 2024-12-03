/*Importacion de los modelos de admin*/
const {
        getAllEventsModel,
        getEventsByNameModel,
        getEventsByIdModel,
        createEventsModel,
        deleteEventsModel,
        editEventsModel
} = require('../models/adminModel');


/**
 * Controlador para obtener todos los eventos.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getEvents = async (req, res) => {
    const page = req.params.page ? req.params.page : 0;

    try {
    let events = await getAllEventsModel(page);
        if(events){
        return res.status(200).json({
                ok: true,
                msg: 'Obteniendo todos los eventos',
                data: events,
                total_pages: events.length
            })
        } else{
            return res.status (400).json({
                ok:false,
                msg: 'No se han obtenido eventos'
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
 * Controlador para obtener eventos por su name.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getEventsByName = async (req, res) => {
    let events;
    try {
        const name = req.params.name;
        events = await getEventsByNameModel(name)
        if(events){
            return res.status(200).json({
                ok: true,
                msg: 'Obteniendo Evento',
                data: events
            })
        }else{
            return res.status(400).json({
                ok:false,
                msg: 'No se han obtenido eventos por name'
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
 * Controlador para obtener eventos por su id.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const getEventsById = async (req, res) => {
    let events;
    try {
        const id = req.params.id;
        events = await getEventsByIdModel(id)
        console.log(events,'en getEventById')
        if(events){
            return res.status(200).json({
                ok: true,
                msg: 'Obteniendo Evento',
                data: events
            })
        }else{
            return res.status(400).json({
                ok:false,
                msg: 'No se han obtenido eventos por id'
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
 * Controlador para crear un evento.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const createEvent = async (req, res) => {
    const {name, 
        description, 
        year, 
        start_date, 
        end_date, 
        event_phase, 
        event_type, 
        enterprise,
        chief} = req.body;
    try {
        const eventSaved = await createEventsModel(name, 
                                                    description, 
                                                    year, 
                                                    start_date, 
                                                    end_date, 
                                                    event_phase, 
                                                    event_type, 
                                                    enterprise,
                                                    chief);
        if(eventSaved){
            return res.status(201).json({
                ok: true,
                msg: 'Creando evento',
                data: eventSaved
            })
        }else{
            return res.status (400).json({
                ok:false,
                msg: 'No se ha creado el evento'
            })
        }
    } catch (error) {
        console.log (error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en la conexion, error al crear el evento'
        })   
    }
};


/**
 * Controlador para eliminar un evento.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const deleteEventById = async (req, res) => {

    try {
        const id = req.params.id;
        const deletedEvent = await deleteEventsModel(id);
        if(deletedEvent){
            return res.status(200).json({
                ok: true,
                msg: 'Evento eliminado',
                data: deletedEvent
            });
        }else{
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la conexion, error al eliminar el evento'
        })
    }
};

/**
 * Controlador para editar un evento.
 * 
 * @param {Object} req - La solicitud.
 * @param {Object} res - La respuesta.
 * @returns {Object} - El objeto JSON con la respuesta.
 */
const editEvent = async (req, res) => {
    const {name, description, year, start_date, end_date, event_phase, event_type, enterprise,chief}  = req.body;

    try {
        const id = req.params.id;
        const eventEdited = await editEventsModel(id, name, description, year, start_date, end_date, event_phase, event_type, enterprise,chief);
        if(eventEdited){
            return res.status(200).json({
                ok:true,
                msg: 'Evento editado',
                data: eventEdited
            })
        }else{
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en la conexion, error al editar el evento'
        })
    }
};


/*Exportacion controladores*/
module.exports={
    getEvents,
    getEventsByName,
    getEventsById,
    createEvent,
    deleteEventById,
    editEvent
}