const app = require('./app');
const http = require('http');
const config = require("./config")
const port = process.env.PORT === undefined ? config.development.port : process.env.PORT

/*
  Modular functions
*/
const Log = require('./functions/log')

http.createServer(app).listen(port);

// Create start log
Log("[LOG]", `${config.branding.project_name} rest API started on TCP port: ` + port)
