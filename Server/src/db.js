require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const {Sequelize} = require('sequelize');
const UserModel = require('./Models/user')



const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/caravanadb`,
   { logging: false, native: false }
)

UserModel(sequelize)

const {user} = sequelize.models

module.exports = {
    ...sequelize.models,
    user,
    conn: sequelize
}