const dbConfig = require('../config').database

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: dbConfig.timezone
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.languages = require("./languages.js")(sequelize, Sequelize);
db.translates = require("./translates.js")(sequelize, Sequelize);
db.sales = require("./sales.js")(sequelize, Sequelize);
db.redeems = require("./redeems.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.parameters = require("./parameters.js")(sequelize, Sequelize);
db.cron_jobs = require("./cron_jobs.js")(sequelize, Sequelize);
db.currencies = require("./currencies.js")(sequelize, Sequelize);
db.crypto_currencies = require("./crypto_currencies.js")(sequelize, Sequelize);


module.exports = db;
