const {Client} = require('pg');
const dotEnv = require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_ASSWORD,
    port: process.env.DE_PORT
});

client.connect()
.then(()=>console.log('Conexão com o banco feita com sucesso'))
.catch((error)=>console.log('Erro na conexão. Motivo: ' + error))


module.exports = client;
