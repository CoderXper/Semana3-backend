// se crea todo dentro del modulo exports
module.exports = (sequelize, type) =>{
    return sequelize.define('usuario', {
        // Model attributes are defined here
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        email: type.STRING,
        password: type.STRING,
        rol: type.STRING
    });
}
