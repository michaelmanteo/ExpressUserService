const http = require('http');
const app = require('../server');
const PORT = 3000;
const server = http.createServer(app).listen(PORT);

server.on('listening', () => {
    console.log(`Express User service app listening on PORT:${server.address().port} in '${app.get('env')}' mode.`);
});