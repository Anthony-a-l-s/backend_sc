const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {}, 
});



sequelize
    .authenticate()
    .then(() => console.log("Conexão feita com sucesso."))
    .catch((err) => console.error("Erro:", err));

module.exports = sequelize;

