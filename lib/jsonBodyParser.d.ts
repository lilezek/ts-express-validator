import * as core from "express-serve-static-core";
export declare function jsonBodyParser<T>(constructor: {
    new (...args: any[]): T;
}): (req: core.Request, res: core.Response, next: core.NextFunction) => void;
