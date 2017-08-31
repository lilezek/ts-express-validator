"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tson = require("typescript-son");
function jsonBodyParser(constructor) {
    return (req, res, next) => {
        try {
            const parsedClass = tson.fromJson(constructor, req.body);
            req.body = parsedClass;
            next();
        }
        catch (e) {
            if (e instanceof tson.IncompatibleSchemaError) {
                next(e);
            }
            else if (e instanceof tson.ValidationError) {
                next(e);
            }
            else {
                throw e;
            }
        }
    };
}
exports.jsonBodyParser = jsonBodyParser;
//# sourceMappingURL=jsonBodyParser.js.map