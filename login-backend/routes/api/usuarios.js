const router = require('express').Router();
//usando {} cuando son varios. Aqui busca el index.js que esta detro de models
const {Usuario} = require('../../models');
//se llama funcion para encriptar contraseñas
const bcrypt = require('bcryptjs');

const usuarioController = require('../../controllers/UserController');


//.com/api/usuario     Esta es la ruta implicita hasta aqui



// El signo / significa que estamos en la ruta raiz de api/usuarios
//async y await porque las consultas a db tardan cierto tiempo en responder
//.com/api/usuario/listar
router.get('/listar', async(req,res) =>{
    const users= await Usuario.findAll();
    res.status(200).json(users);
});


//.com/api/usuario/register
router.post('/register', async(req,res) =>{
    //linea de codigo para encriptar el password. hashSync(req.body.password,12) El numero de veces que se desea encriptar
    req.body.password = bcrypt.hashSync(req.body.password,12);
    //Se envia la peticion de crear con los parametros que aparecen en el body en postman
    // cuando se envia una peticion tipo post se envian los parametros a través del body (postman)
    const user= await Usuario.create(req.body);
    res.status(200).json(user);
});


//Tarea, convertir los dos metodos anteriores a la forma de controlador como el de login



//.com/api/usuario/Login
//post para escribir, aunque tambien se usa para peticiones
//Como segundo parámetro se le envia un controlador llevan la palabra controller para identificar con el metodo login
router.post('/login', usuarioController.login);


//.com/api/usuario/actualizar
//post para escribir cambios cuando se han entrado mal o se quieren modificar

// router.post('/actualizar', usuarioController.actualizar);








module.exports = router;
