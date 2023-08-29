require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const {Sequelize} = require('sequelize');
const CountryModel = require('./Models/Countries')
const EmpresaModel = require('./Models/Companies')
const OfferModel = require('./Models/Offers')
const TraningModel = require('./Models/Trainings')
const UserModel = require('./Models/Users')
const RubroModel = require('./Models/Rubros')



const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/caravanadb`,
   { logging: false, native: false }
)

CountryModel(sequelize)
EmpresaModel(sequelize)
OfferModel(sequelize)
TraningModel(sequelize)
UserModel(sequelize)
RubroModel(sequelize)

const {country, companies, offer, training, user, areaTraining } = sequelize.models

//Relacion de paises con empresas
country.hasMany(companies);
companies.belongsTo(country);

//Relacion de empresas con capacitaciones
companies.hasMany(training);
training.belongsTo(companies);

//Relacion de paises a ususarios
country.hasMany(user);
user.belongsTo(country);

//Relacion de capacitaciones a rubros => crear model de rubro
training.belongsToMany(areaTraining, {through: 'training_areaTraining'})
areaTraining.belongsToMany(training, {through: 'training_areaTraining'})

//Relacion de usuarios con capacitaciones
user.belongsToMany(training, {through: 'user_training'});
training.belongsToMany(user, {through: 'user_training'});

//Relacion de empresas a rubros
companies.belongsToMany(areaTraining, {through: 'companies_areaTraining'})
areaTraining.belongsToMany(areaTraining, {through: 'companies_areaTraining'})

//Relacion de empresas con avisos
companies.hasMany(offer);
offer.belongsTo(companies);








module.exports = {
    ...sequelize.models,
    country,
    companies,
    offer,
    training,
    user,
    conn: sequelize
}