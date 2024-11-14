/*Importaciones*/
const express = require('express');
const app=express();

const cors = require('cors');

require('dotenv').config();


/*Middlewares*/
// parse application/x-www-form-urlencoded //Para capturar datos del formulario
app.use(express.urlencoded({ extended: false }))

//const WhiteList = [] y origin=WhiteList como argumento a cors 
app.use(cors());

// parse application/json //Para leer archivos json
app.use(express.json())


/*Seteo del servidor*/
const port = process.env.PORT || 4000;


/*Rutas*/

app.use ('/apigestion/v1/admin', require('./routers/apiRouterAdmin'))


/*Servidor puesto a la escucha*/
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})