/*Importaciones*/
const express = require('express');
const app=express();

const cors = require('cors');

require('dotenv').config();

/*Middlewares*/
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.use(cors());

// parse application/json
app.use(express.json())


/*Seteo del servidor*/
const port = process.env.PORT || 4000;


/*Rutas*/

//app.use ('/apigestion/v1/admin', require('./routers/apiRouterAdmin'))


/*Servidor puesto a la escucha*/
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})