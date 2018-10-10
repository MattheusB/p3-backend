const app = require("../src/index");
const request = require("supertest");
const mocha = require("mocha");
const httpConstrants = require("../src/constrants/http.constrants")
const userModel = require("../src/user/user.model")

describe("GET /", () =>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(httpConstrants.OK)
        .end(done)
    });
});



