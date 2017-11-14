"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typescript_son_1 = require("typescript-son");
function postValidator(target) {
    const validators = Reflect.getMetadata("ts-express-validator:validators", target.constructor);
    if (validators) {
        for (const k in validators) {
            const vals = validators[k];
            if (vals instanceof Array) {
                const error = vals.reduce((err, val) => (err || val(target[k])), undefined);
                if (error) {
                    return error;
                }
            }
        }
    }
}
function functionValidator(fn) {
    return (metaTarget, propertyKey) => {
        const target = metaTarget.constructor;
        let postValidators = Reflect.getMetadata("tson:post", target);
        if (!postValidators) {
            Reflect.defineMetadata("tson:post", postValidators = [], target);
        }
        if (postValidators.indexOf(postValidator) === -1) {
            postValidators.push(postValidator);
        }
        let validators = Reflect.getMetadata("ts-express-validator:validators", target);
        if (!validators) {
            validators = {};
            Reflect.defineMetadata("ts-express-validator:validators", validators, target);
        }
        if (!validators[propertyKey]) {
            validators[propertyKey] = [];
        }
        validators[propertyKey].push(fn);
    };
}
exports.functionValidator = functionValidator;
function isInteger() {
    return functionValidator((val) => {
        if (val > (~~val)) {
            return new typescript_son_1.ValidationError("Expected integer but " + val + " found");
        }
    });
}
exports.isInteger = isInteger;
function isGreaterThan(gt) {
    return functionValidator((val) => {
        if (gt >= val) {
            return new typescript_son_1.ValidationError("Expected " + val + " to be greater than " + gt);
        }
    });
}
exports.isGreaterThan = isGreaterThan;
function isLowerThan(lt) {
    return functionValidator((val) => {
        if (lt <= val) {
            return new typescript_son_1.ValidationError("Expected " + val + " to be lower than " + lt);
        }
    });
}
exports.isLowerThan = isLowerThan;
function isGreaterEqual(ge) {
    return functionValidator((val) => {
        if (ge > val) {
            return new typescript_son_1.ValidationError("Expected " + val + " to be greater or equal than " + ge);
        }
    });
}
exports.isGreaterEqual = isGreaterEqual;
function isLowerEqual(lt) {
    return functionValidator((val) => {
        if (lt < val) {
            return new typescript_son_1.ValidationError("Expected " + val + " to be lower or equal than " + lt);
        }
    });
}
exports.isLowerEqual = isLowerEqual;
//# sourceMappingURL=validators.js.map