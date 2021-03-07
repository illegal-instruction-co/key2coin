const dbConfig = require('../config').database

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.languages = require("./languages.model.js")(sequelize, Sequelize);
db.translates = require("./translates.model.js")(sequelize, Sequelize);
db.sales = require("./sales.model.js")(sequelize, Sequelize);
db.redeems = require("./redeems.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.parameters = require("./parameters.model.js")(sequelize, Sequelize);

module.exports = db;
