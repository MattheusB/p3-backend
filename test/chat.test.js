const app = require("../src/index");
const request = require("supertest");
const mocha = require("mocha");
const httpConstrants = require("../src/constrants/http.constrants")


describe("GET /chat", () =>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/chat")
        .expect("Content-Type", /json/)
        .expect(httpConstrants.OK)
        .end(done)
    });
});

describe("/GET Chat", function () {
    it("Deve retornar todos os chats que já foram cadastrados no sistema", function (done) {
            request(app)
            .get('/chat')
            .expect("Content-Type", /json/)
            .expect(httpConstrants.OK)
            .end(done)
        });
    
});

describe("/GET Chat", function () {
    it("Deve retornar todos os chats que já foram cadastrados no sistema", function (done) {
            request(app)
            .get('/chat')
            .expect("Content-Type", /json/)
            .expect(httpConstrants.OK)
            .end(done)
    });
});
