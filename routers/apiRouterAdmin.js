/*Importacion de express*/
const express = require('express');

/*Metodo router de express guardado en un a costante para poder utilizarlo*/
const router = express.Router();

/*Importacion de express-validator*/
const {check} = require('express-validator')

/*Importacion de funciones controladoras*/
const {
        getEvents,
        getEventsByName,
        createEvent,
        deleteEventById,
        editEvent
} = require('../controllers/adminController')


router.get('/events', getEvents);

router.get('/eventsname', getEventsByName);

router.post('/createevent', createEvent);

router.delete('/deleteevent/:id', deleteEventById);

router.put('/editevent/:id', editEvent);




/*Exportacion de rutas*/
module.exports=router;