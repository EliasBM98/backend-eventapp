/*Importaciones*/
const express = require('express');
const app=express();
const cors = require('cors');
require('dotenv').config();


/*Middlewares*/
// parse application/x-www-form-urlencoded //Para capturar datos del formulario
app.use(express.urlencoded({ extended: false }))

const WhiteList = ['http://localhost:5173/', '*']
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// parse application/json //Para leer archivos json
app.use(express.json())


/*Seteo del servidor*/
const port = process.env.PORT || 4000;


/*Rutas*/

app.use ('/apigestion/v1/admin', require('./routers/apiRouterAdmin'))
app.use ('/apigestion/v1/auth', require('./routers/apiAuthRouters'))


/*Servidor puesto a la escucha*/
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})
