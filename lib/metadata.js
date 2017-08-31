"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
require("reflect-metadata");
const express_1 = require("./test/express");
Reflect.defineMetadata("atm:body", { login: { type: { kind: 0, primitive: "string" }, visibility: 1, optional: false }, password: { type: { kind: 0, primitive: "string" }, visibility: 1, optional: false }, isMobile: { type: { kind: 0, primitive: "boolean" }, visibility: 1, optional: true }, }, express_1.LoginRequest);
Reflect.defineMetadata("atm:body", { age: { type: { kind: 0, primitive: "number" }, visibility: 1, optional: false }, }, express_1.SetAge);
//# sourceMappingURL=metadata.js.map