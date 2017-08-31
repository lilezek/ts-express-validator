import chai = require("chai");
import chaihttp = require("chai-http");
import { afterListen } from "./express";

chai.use(chaihttp);

const expect = chai.expect;
const server = "http://localhost:8081";

function asyncToMocha(fn: () => Promise<void | Error>) {
  return (done: MochaDone) => {
    fn().then(done).catch(done);
  };
}

describe("Basic tests", () => {

  before(asyncToMocha(async () => {
    await afterListen;
  }));

  it("Good request", asyncToMocha(async () => {
    let response = await chai.request(server).post("/login")
      .send({ login: "admin", password: "password" });
    expect(response.body).to.have.property("valid");
    expect(response.body.valid).to.be.eq(true);
    response = await chai.request(server).post("/login")
      .send({ login: "admin", password: "bad" });
    expect(response.body).to.have.property("valid");
    expect(response.body.valid).to.be.eq(false);
    response = await chai.request(server).put("/age")
      .send({ age: 22 });
    expect(response.body).to.have.property("valid");
    expect(response.body.valid).to.be.eq(true);
  }));

  it("Bad request", asyncToMocha(async () => {
    try {
      const response = await chai.request(server).post("/login")
        .send({ login: 14, password: "password" });
      return new Error("Expected to throw #1");
    } catch (e) {
      expect(e.response.statusCode).to.be.eq(400);
    }
    try {
      const response = await chai.request(server).put("/age")
        .send({ age: 10.7 });
      return new Error("Expected to throw #2");
    } catch (e) {
      expect(e.response.statusCode).to.be.eq(400);
    }
  }));
});
