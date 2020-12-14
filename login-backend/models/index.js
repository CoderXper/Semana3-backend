const { Sequelize } = require('sequelize');
const UsuarioModelo = require('./usuarios');

// Option 2: Passing parameters separately (other dialects)
// Se copia de la documentacion de Sequelize
const sequelize = new Sequelize('yKqRjEOVQa', 'yKqRjEOVQa', 'xe17Kh3E8K', {
    host: 'remotemysql.com',
    dialect:  'mysql'
    // port: 3306 por defecto lo asume    
  });

  //lleva dos parametros la instancia sequelize y el tipo
  const Usuario = UsuarioModelo(sequelize, Sequelize);


  sequelize.sync({ force: false })
    .then(()=>{
        console.log('Tablas sincronizadas');
    })

    //modulo de exportacion, todo esto se puede exportar a otro lado
    //el modelo Usuario se pone a disposicion de quien lo necesite
    module.exports = {
        Usuario
    }