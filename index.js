require('dotenv').config();
const sequelize = require('./database/sequelize');
const app = require('./src/app');
const User = require('./database/models/user');
const Seeds  = require('./src/seed')


app.listen(process.env.PORT, async ()=>{
    await sequelize.sync();
    console.log(`Sevrvidor rodando em: http://localhost:${process.env.PORT}`);
    Seeds.createAdmin();
})

