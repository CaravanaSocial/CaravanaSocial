require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/caravanadb`,
   { logging: false, native: false }
)

module.exports = {
    conn: sequelize
}