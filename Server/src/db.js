require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, SERVER_URL } = process.env;
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
const PrefixesModel = require("./Models/Prefixes");
const SuccessModel = require("./Models/SuccessStory");
const QuestionsModel = require("./Models/frequentQuestions");
const CommentsModel = require("./Models/comments");
const BlogModel = require("./Models/blog");

// const sequelize = new Sequelize(SERVER_URL, {
//   logging: false,
//   native: false,
//   dialectOptions: {
//     ssl: {
//       require: true, // Requiere una conexión SSL/TLS
//       rejectUnauthorized: false,
//     },
//   },
// });

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
SuccessModel(sequelize);
QuestionsModel(sequelize);
CommentsModel(sequelize);
BlogModel(sequelize);

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
  success,
  question,
  comment,
  blog,
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

//Relacion de avisos a Rubros
offer.belongsToMany(areaTraining, { through: "offers_rubro" });
areaTraining.belongsToMany(offer, { through: "offers_rubro" });

//Relacion de empresas a rubros
companies.belongsToMany(areaTraining, { through: "companies_areaTraining" });
areaTraining.belongsToMany(companies, { through: "companies_areaTraining" });

user.belongsToMany(areaTraining, { through: "users_areaTraining" });
areaTraining.belongsToMany(user, { through: "users_areaTraining" });

//Relación de admin con avisos.
admin.hasMany(offer);
offer.belongsTo(admin);

//Relación de admin con empresas.
admin.hasMany(training);
training.belongsTo(admin);

//Relacion de comentario con capacitacion
training.hasMany(comment);
comment.belongsTo(training);

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
  success,
  question,
  comment,
  blog,
  conn: sequelize,
};
