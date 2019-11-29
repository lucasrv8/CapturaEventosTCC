const Sequelize = require('sequelize')

//Conexão com o banco de dados

const sequelize = new Sequelize('postapp', 'root', '465613luh', {
    //host: "mysql669.umbler.com",
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}