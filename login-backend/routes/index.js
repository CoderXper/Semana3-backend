const router = require('express').Router();
const  apiUsuarioRouter = require('./api/usuarios');

router.use('/usuario', apiUsuarioRouter);
//En caso de requerir otra ruta
// router.use('/articulo', apiArticuloRouter);


module.exports = router;
