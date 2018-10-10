const app = require("../src/index");
const request = require("supertest");
const mocha = require("mocha");
const httpConstrants = require("../src/constrants/http.constrants")
const userModel = require("../src/user/user.model")


describe("GET /user", ()=>{
    it("expect a json file", (done) =>{
        request(app)
        .get("/user")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(done)
    });
});

describe("/GET User", function () {
    it("Deve retornar todos os usuários que já foram cadastrados no sistema", function (done) {
            request(app)
            .get('/user')
            .expect("Content-Type", /json/)
            .expect(httpConstrants.OK)
            .end(done)
        });
    
});

describe("/GET User", function () {
    it("Deve retornar todos os usuários que já foram cadastrados no sistema", function (done) {
            request(app)
            .get('/user')
            .expect("Content-Type", /json/)
            .expect(httpConstrants.OK)
            .end(done)
    });
});

describe("/POST user", function () {
    it("Não deve executar o post do usuário, já que não foi passado o campo password, sendo o mesmo obrigatório", function (done) {
        var user = {
            "name": "Mattheus Brito Rodrigues",
            "email": "mattheusbritor@gmail.com",
            "role": "admin"
        }
            request(app)
            .post("/user")
            .send(user)
            .expect(httpConstrants.INTERNAL_SERVER_ERROR)
            .end(done)
        });
    
});


describe("/DELETE/:id user", function () {
    it("Deve excluir um usuário de acordo com o id", function (done) {
        var user = new userModel({
            name: "Mattheus",
            email: "mattheus@gmail.com",
            password: "password12",
            role: "admin"
        })
                request(app)
                .delete('/user/' + user.id)
                .end(done)

                request(app)
                .get("/user")
                .expect(httpConstrants.OK)
                .end(done)
    });
});
