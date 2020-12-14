//usando {} cuando son varios. Aqui busca el index.js que esta detro de models
const {Usuario} = require('../models');
//se llama funcion para encriptar contraseñas
const bcrypt = require('bcryptjs');
//se importa de la documentacions como funciona el jsonwebtoken
var jwt = require('jsonwebtoken');


//El next en caso de error se indica que hacer para que siga ejecutandose
exports.login = async(req,res,next) =>{
    try {
        //findOne es como el SELECT al hacer consultas en SQL
        const user = await Usuario.findOne({where:{email:req.body.email} });

        if (user){
            // bcrypt permite hacer comparacion Sync para no tener que esperar, compara con contraseña encriptada
            // el request (req) es lo que envian desde el formulario de login
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if (passwordIsValid){
                //Se encriptan los datos del usuario
                //1)objeto todos los datos de usuario;
                //2)Llave secreta que se puede definir en otro archivo dentro del proyecto y se llamapara no visualizarla aqui (una cadena de texto para hacer la encriptacion)
                //3)En cuanto tiempo expira el token (en segundos)
                const token = jwt.sign({
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol,
                    email: user.email
                },'hola soy una cadena secreta',{
                    expiresIn: 86400
                });
                // enlazar con el token y el usuario del frontend que se almacenaba en localStorage ==> jwt
                //El usuario (no es obligatorio incluirlo aqui) se almacenaba como usuario en localStorage y el token como jwt
                //El profesor uso tokenReturn:token
                res.status(200).send({
                    requireAuth: true,
                    tokenReturn: token,
                    //No nos interesa enviar la informacion del usuario porque se puede decodificar del token
                    // usuario:user
                });
            }else{
                res.status(401).json({
                    error:'Error0 en los datos ingresados'
                })
            }
        }else{
            res.status(404).json({
                error: 'Error1 en los datos ingresados'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!!!'
        })
        //Permite que la aplicación siga funcionando a pesar del error
        next(error);
    }

};

// exports.listar = async(req,res,next) =>{
//     try {
        
//     } catch (error) {

//         next(error);        
//     }

// };

// exports.register = async(req,res,next) =>{
//     try {
        
//     } catch (error) {

//         next(error);        
//     }

// }