const express = require('express');
const http = require('http');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const routes = require('./routes');
app.use('/courses', routes);
const server = http.createServer(app);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running on http://127.0.0.1:3000');
});