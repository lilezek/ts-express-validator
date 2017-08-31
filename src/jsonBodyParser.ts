import * as core from "express-serve-static-core";
import * as tson from "typescript-son";

export function jsonBodyParser<T>(constructor: {new(...args: any[]): T}) {
  return (req: core.Request, res: core.Response, next: core.NextFunction) => {
    try {
      const parsedClass = tson.fromJson(constructor, req.body);
      req.body = parsedClass;
      next();
    } catch (e) {
      if (e instanceof tson.IncompatibleSchemaError) {
        next(e);
      } else if (e instanceof tson.ValidationError) {
        next(e);
      } else {
        throw e;
      }
    }
  };
}
