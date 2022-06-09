
// dependencies
const http = require('http');
const { reqResHandler } = require('./helpers/reqResHandler');


// module wrapper
const app = {}

// configuration
app.config = {
    port: 3000,
}

// creating server
app.createServer = () => {
    const server = http.createServer(reqResHandler)
    server.listen(app.config.port, () => {
        console.log("Server is running on port:" + app.config.port);
    })
}

// app.reqResHandler = reqResHandler;

// server initialize
app.createServer()

