"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaihttp = require("chai-http");
const express_1 = require("./express");
chai.use(chaihttp);
const expect = chai.expect;
const server = "http://localhost:8081";
function asyncToMocha(fn) {
    return (done) => {
        fn().then(done).catch(done);
    };
}
describe("Basic tests", () => {
    before(asyncToMocha(() => __awaiter(this, void 0, void 0, function* () {
        yield express_1.afterListen;
    })));
    it("Good request", asyncToMocha(() => __awaiter(this, void 0, void 0, function* () {
        let response = yield chai.request(server).post("/login")
            .send({ login: "admin", password: "password" });
        expect(response.body).to.have.property("valid");
        expect(response.body.valid).to.be.eq(true);
        response = yield chai.request(server).post("/login")
            .send({ login: "admin", password: "bad" });
        expect(response.body).to.have.property("valid");
        expect(response.body.valid).to.be.eq(false);
        response = yield chai.request(server).put("/age")
            .send({ age: 22 });
        expect(response.body).to.have.property("valid");
        expect(response.body.valid).to.be.eq(true);
    })));
    it("Bad request", asyncToMocha(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield chai.request(server).post("/login")
                .send({ login: 14, password: "password" });
            return new Error("Expected to throw #1");
        }
        catch (e) {
            expect(e.response.statusCode).to.be.eq(400);
        }
        try {
            const response = yield chai.request(server).put("/age")
                .send({ age: 10.7 });
            return new Error("Expected to throw #2");
        }
        catch (e) {
            expect(e.response.statusCode).to.be.eq(400);
        }
    })));
});
//# sourceMappingURL=test.js.map