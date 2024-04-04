const http = require("http");

const server = http.createServer();

server.listen(8080, function(){
    console.log("server listening on http://localhost:8080");
});
