const app = require('./app');
const http = require('http');
const port = process.env.PORT === undefined ? 3030 : process.env.PORT

http.createServer(app).listen(port);

console.log("[LOG]", "API started on " + port);
