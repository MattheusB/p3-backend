const app = require("../src/index");
const request = require("supertest");
const mocha = require("mocha");

describe("GET /", () =>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(done)
    });
});

describe("GET /user", ()=>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/user")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(done)
    });
});

describe("GET /chat", () =>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/chat")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(done)
    });
});