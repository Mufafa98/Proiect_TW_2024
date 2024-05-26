const dotenv = require("dotenv").config({
    path: "./src/config/.env"
});
const http = require("node:http");
const app = require("./app");

// Define the ip and port
const ip = "127.0.0.1";
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    if (req.method === 'OPTIONS') {
        // Respond to CORS preflight requests
        res.writeHead(200);
        res.end();
        return;
    }
    app(req, res);
});

// async function test() {
//     const database = require("./services/databaseServices");
//     const response = await database.query("SELECT * from UserDatabase.studenti")
//     console.log(response)
// }

// test();

// Start the server and listen on the specified port
server.listen(port, ip, () => {

    console.log(`Server running at http://${ip}:${port}/`);
});
