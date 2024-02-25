const { DataTypes } = require("sequelize");
const sequelize = require('../sequelize');


const User = sequelize.define( 'user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    freezeTableName: true,
    tableName: 'user',
});

module.exports = User;




