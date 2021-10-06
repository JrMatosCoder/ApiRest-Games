const sequelize = require("sequelize");
const connection = require("./database");

const game = connection.define("games",{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    year:{
        type: sequelize.STRING,
        allowNull: false
    },
    price:{
        type: sequelize.STRING,
        allowNull: false
    }
})
module.exports = game;