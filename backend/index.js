// librerias
const express = require('express');


//inicializo
const app = express();
require('./scraping');


// configuro
// acordate de poner la opcion por defecto en el servidor
app.set('port',715);

//muestro el puerto

app.listen(app.get('port'),()=>{
    console.log('servidor en puerto', app.get('port'));
})





