const app = require('./app');
const http = require('http');
const config = require("./config")
const cronoJobs = require("./crono_job/index")

process.title = 'k2c_server_side';

const port = process.env.PORT === undefined ? config.development.port : process.env.PORT


const db = require("./models");
db.sequelize.sync({ force: false , alter : true })

/*
  Modular functions
*/
const Log = require('./functions/log')

http.createServer(app).listen(port);

// Run crono jobs
cronoJobs()

// Create start log
Log(config.basis.log_prefix, `${config.branding.project_name} rest API started on TCP port: ` + port)
