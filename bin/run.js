const http = require('http');
const app = require('../server');
const PORT = 3000;
const mongoDB = require('../server/config/mongoDB');
const server = http.createServer(app).listen(PORT);

server.on('listening', () => {
    mongoDB.connect( () => console.log('Connected to MongoDB'));
    console.log(`Express User Service listening on PORT:${server.address().port} in '${app.get('env')}' mode.`);
});