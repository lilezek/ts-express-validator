// tslint:disable
import "reflect-metadata";
import {LoginRequest, SetAge} from "./test/express";
Reflect.defineMetadata("atm:body", {login: {type: {kind:0,primitive: "string"}, visibility: 1, optional: false},password: {type: {kind:0,primitive: "string"}, visibility: 1, optional: false},isMobile: {type: {kind:0,primitive: "boolean"}, visibility: 1, optional: true},}, LoginRequest);
Reflect.defineMetadata("atm:body", {age: {type: {kind:0,primitive: "number"}, visibility: 1, optional: false},}, SetAge);

