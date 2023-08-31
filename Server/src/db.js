require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");
const CountryModel = require("./Models/Countries");
const EmpresaModel = require("./Models/Companies");
const OfferModel = require("./Models/Offers");
const TraningModel = require("./Models/Trainings");
const UserModel = require("./Models/Users");
const RubroModel = require("./Models/Rubros");
const AdminModel = require("./Models/admin");
const CitiesModel = require("./Models/Cities");
const StatesModel = require("./Models/States");
const PrefixesModel = require('./Models/Prefixes')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/caravanadb`,
  { logging: false, native: false }
);

CountryModel(sequelize);
EmpresaModel(sequelize);
OfferModel(sequelize);
TraningModel(sequelize);
UserModel(sequelize);
RubroModel(sequelize);
AdminModel(sequelize);
CitiesModel(sequelize);
StatesModel(sequelize);
PrefixesModel(sequelize);

const {
  country,
  city,
  state,
  companies,
  offer,
  training,
  user,
  areaTraining,
  admin,
  prefix,
} = sequelize.models;

//Relacion de empresas con capacitaciones
companies.hasMany(training);
training.belongsTo(companies);

//Relacion de capacitaciones a rubros => crear model de rubro
training.belongsToMany(areaTraining, { through: "training_areaTraining" });
areaTraining.belongsToMany(training, { through: "training_areaTraining" });

//Relacion de usuarios con capacitaciones
user.belongsToMany(training, { through: "user_training" });
training.belongsToMany(user, { through: "user_training" });

//Relacion de empresas con avisos
companies.hasMany(offer);
offer.belongsTo(companies);

//Relacion de empresas a rubros
companies.belongsToMany(areaTraining, {through: "companies_areaTraining", as: "rubro",});
areaTraining.belongsToMany(companies, {through: "companies_areaTraining", as: "rubro",});


module.exports = {
  ...sequelize.models,
  prefix,
  country,
  companies,
  offer,
  training,
  user,
  areaTraining,
  admin,
  city,
  state,
  conn: sequelize,
};
