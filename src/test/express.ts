import body = require("body-parser");
import express = require("express");
import { jsonBodyParser } from "../jsonBodyParser";
import { isGreaterEqual, isInteger } from "../validators";

export class LoginRequest {
  public login: string;
  public password: string;
  public isMobile?: boolean;

  public isValid() {
    return this.login === "admin" && this.password === "password";
  }
}

const app = express();

app.use(body.json());

app.post("/login", jsonBodyParser(LoginRequest), (req, res) => {
  res.statusCode = 200;
  res.send({ valid: req.body.isValid() });
});

export class SetAge {
  @isGreaterEqual(18)
  @isInteger()
  public age: number;
}

app.put("/age", jsonBodyParser(SetAge), (req, res) => {
  res.statusCode = 200;
  res.send({ valid: req.body instanceof SetAge });
});

app.use((err: any, req: any, res: any, next: any) => {
  res.statusCode = 400;
  res.send({error: err.message});
  next();
});

export const afterListen = new Promise((res, rej) => {
  app.listen(8081, res);
});
