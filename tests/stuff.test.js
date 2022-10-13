process.env.NODE_ENV = "test";

let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

describe("/GET /api/stuff", () => {
  it("ce test doit retourner tous les stuffs", (done) => {
    chai
      .request(server)
      .get("/api/stuff")
      .end((err, res) => {
        res.should.have.status(200); // Au premier essai, ne fonctionne pas a cause de l'auth. On a juste commenté le middleware pour le test
        res.body.should.be.a("array");
        done();
      });
  });
});
