//express puede ser cualquiera
//Express es un framework de node que permite modularidad
//menos codigo para trabajar con node
const express = require('express'); 
const morgan = require('morgan');
//al escribir /routes el busca automaticamente un index.js dentro de routes
const apiRouter = require('./routes');
//Llamamos al body parser para lectura de archivos json y poder hacer peticiones
//Recibir las peticiones en formato json
const bodyParser = require('body-parser');

//Al final para sincronizar con frontend se instala CORS para prevenir error en la conectividad, tambien se hace el app.use
//Para solucionar el problema de las peticiones desde el mismo destino
const cors = require('cors');








//Aqui vive la aplicacion Express
const app = express();
const port = 3000;

//Se instala morgan middleware en configutacion dev para detectar peticiones en la consola Terminal
//Dev: Concise output colored by response status for development use
//:method :url :status :response-time ms - :res[content-length]
app.use(morgan('dev'));

//para solucionar el problema de las peticiones desde el mismo destino
app.use(cors());

app.use(bodyParser.json());

//Cuando se intenta hacer un register por postman se activa la opcion x-www-form-urlencoded
//La peticion de register viene codificada, se necesita esta linea para decodificar
app.use(bodyParser.urlencoded({extended: true}));


// primer gestor para que detecte la ruta cuando es /api
app.use('/api', apiRouter);

// se agrega el arrow funtion para saber si se levanto el puerto
app.listen(port, () => {
  console.log(`server up`)
})

