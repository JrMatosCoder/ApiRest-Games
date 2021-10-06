const sequelize = require("sequelize");
const connection = new sequelize("games","root","BOY9954",{
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = connection;