const dotenv = require("dotenv").config({
    path: "./src/config/.env"
});
const http = require("node:http");
const app = require("./app");

// Define the ip and port
const ip = "127.0.0.1";
const port = 3000;

// Create the server
const server = http.createServer((req, res) => { app(req, res); });



// Start the server and listen on the specified port
server.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}/`);
});
