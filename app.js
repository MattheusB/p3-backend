const http = require("http");

const server = http.createServer((req, res) =>{
    if (req.url === "/"){
        res.write("TinDog working!")
        res.end();
    }

    if(req.url === "/api/tindog"){
        res.write(JSON.stringify(["pug", "bulldog", "husky"]))
        res.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000....");