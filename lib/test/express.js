"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const body = require("body-parser");
const express = require("express");
const jsonBodyParser_1 = require("../jsonBodyParser");
const validators_1 = require("../validators");
const awesome_metadata_1 = require("awesome-metadata");
class LoginRequest {
    __metadataDummyMethod() {
    }
    isValid() {
        return this.login === "admin" && this.password === "password";
    }
}
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { login: { kind: 0, primitive: "string" }, password: { kind: 0, primitive: "string" }, isMobile: { kind: 3, and: false, left: { kind: 0, primitive: "undefined" }, right: {} } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginRequest.prototype, "__metadataDummyMethod", null);
exports.LoginRequest = LoginRequest;
const app = express();
app.use(body.json());
app.post("/login", jsonBodyParser_1.jsonBodyParser(LoginRequest), (req, res) => {
    res.statusCode = 200;
    res.send({ valid: req.body.isValid() });
});
class SetAge {
    __metadataDummyMethod() {
    }
}
__decorate([
    awesome_metadata_1.DecoratorInjectMetadata("atm:body", { age: { kind: 0, primitive: "number" } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SetAge.prototype, "__metadataDummyMethod", null);
__decorate([
    validators_1.isGreaterEqual(18),
    validators_1.isInteger(),
    __metadata("design:type", Number)
], SetAge.prototype, "age", void 0);
exports.SetAge = SetAge;
app.put("/age", jsonBodyParser_1.jsonBodyParser(SetAge), (req, res) => {
    res.statusCode = 200;
    res.send({ valid: req.body instanceof SetAge });
});
app.use((err, req, res, next) => {
    res.statusCode = 400;
    res.send({ error: err.message });
    next();
});
exports.afterListen = new Promise((res, rej) => {
    app.listen(8081, res);
});
//# sourceMappingURL=express.js.map