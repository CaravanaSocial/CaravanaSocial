require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const {Sequelize} = require('sequelize');
const CountryModel = require('./Models/Countries')
const EmpresaModel = require('./Models/Companies')
const OfferModel = require('./Models/Offers')
const TraningModel = require('./Models/Trainings')
const UserModel = require('./Models/Users')



const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/caravanadb`,
   { logging: false, native: false }
)

CountryModel(sequelize)
EmpresaModel(sequelize)
OfferModel(sequelize)
TraningModel(sequelize)
UserModel(sequelize)

const {country, companies, offer, training, user } = sequelize.models

module.exports = {
    ...sequelize.models,
    country,
    companies,
    offer,
    training,
    user,
    conn: sequelize
}