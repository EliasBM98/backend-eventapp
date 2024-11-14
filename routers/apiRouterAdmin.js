/*Importacion de express*/
const express = require('express');

/*Metodo router de express guardado en un a costante para poder utilizarlo*/
const router = express.Router();

/*Importacion de express-validator*/
const {check} = require('express-validator')

/*Importacion de función validadora de inputs*/
const {validateInputs} = require('../middlewares/validateInputs')

/*Importacion de funciones controladoras*/
const {
        getEvents,
        getEventsByName,
        createEvent,
        deleteEventById,
        editEvent
} = require('../controllers/adminController')


/*Rutas api Eventos*/
router.get('/events/:page', [
        check('page')
                .notEmpty().withMessage('Nombre del evento requerido')
                .isLength({max:100}).withMessage('El titulo del evento no puede exceder 100 caracteres'),
        validateInputs
], getEvents);

router.get('/eventsname', [
        check('name')
                .notEmpty().withMessage('Nombre del evento requerido')
                .isLength({max:100}).withMessage('El titulo del evento no puede exceder 100 caracteres'),
        validateInputs
], getEventsByName);

router.post('/createevent', [
        check('name')
                .notEmpty().withMessage('Nombre del evento requerido')
                .isLength({max:100}).withMessage('El titulo del evento no puede exceder 100 caracteres'),
        check('description')
                .notEmpty().withMessage('Es necesaria una breve descripcion')
                .isLength({max:255}).withMessage('La descripción no debe exceder los 255 caracteres'),
        check('year')
                .notEmpty().withMessage('Año de contratación requerido')
                .isInt().withMessage('El año debe ser un numero'),
        check('start_date')
                .notEmpty().withMessage('Fecha de inicio requerida')
                .isInt().withMessage('La fecha debe ser un numero'),
        check('end_date')
                .notEmpty().withMessage('Fecha de fin requerida')
                .isInt().withMessage('La fecha debe ser un numero'), 
        check('event_type')
                .notEmpty().withMessage('Tipo de evento requerido')
                .isLength({max:50}).withMessage('El tipo no puede exceder 50 caracteres'),
        check('event_phase')
                .notEmpty().withMessage('Fase del evento requerida')
                .isLength({max:50}).withMessage('La fase no puede exceder 50 caracteres'),
        check('enterprise')
                .notEmpty().withMessage('Nombre de la empresa requerido')
                .isLength({max:50}).withMessage('El nombre no puede exceder 50 caracteres'),
        check('chief')
                .notEmpty().withMessage('Nombre del lider de equipo requerido')
                .isLength({max:100}).withMessage('El nombre no puede exceder 100 caracteres'),             
        validateInputs
], createEvent);

router.delete('/deleteevent/:id', [
        check('id')
                .notEmpty().withMessage('Id requerido')
                .isInt().withMessage('El Id debe ser un numero'),
        validateInputs
], deleteEventById);

router.put('/editevent/:id', [
        check('id')
                .notEmpty().withMessage('Id requerido')
                .isInt().withMessage('El Id debe ser un numero'),
        check('name')
                .notEmpty().withMessage('Nombre del evento requerido')
                .isLength({max:100}).withMessage('El titulo del evento no puede exceder 100 caracteres'),
        check('description')
                .notEmpty().withMessage('Es necesaria una breve descripcion')
                .isLength({max:255}).withMessage('La descripción no debe exceder los 255 caracteres'),
        check('year')
                .notEmpty().withMessage('Año de contratación requerido')
                .isInt().withMessage('El año debe ser un numero'),
        check('start_date')
                .notEmpty().withMessage('Fecha de inicio requerida')
                .isInt().withMessage('La fecha debe ser un numero'),
        check('end_date')
                .notEmpty().withMessage('Fecha de fin requerida')
                .isInt().withMessage('La fecha debe ser un numero'), 
        check('event_type')
                .notEmpty().withMessage('Tipo de evento requerido')
                .isLength({max:50}).withMessage('El tipo no puede exceder 50 caracteres'),
        check('event_phase')
                .notEmpty().withMessage('Fase del evento requerida')
                .isLength({max:50}).withMessage('La fase no puede exceder 50 caracteres'),
        check('enterprise')
                .notEmpty().withMessage('Nombre de la empresa requerido')
                .isLength({max:50}).withMessage('El nombre no puede exceder 50 caracteres'),
        check('chief')
                .notEmpty().withMessage('Nombre del lider de equipo requerido')
                .isLength({max:100}).withMessage('El nombre no puede exceder 100 caracteres'),             
        validateInputs
], editEvent);


/*Exportacion de rutas*/
module.exports=router;