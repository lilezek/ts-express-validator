import "reflect-metadata";
import {ValidationError, ValidatorFunction} from "typescript-son";

function postValidator<T>(target: T) {
  const validators = Reflect.getMetadata<T>("ts-express-validator:validators", target.constructor as any);
  if (validators) {
    for (const k in validators) {
      const vals = validators[k];
      if (vals instanceof Array) {
        const error = vals.reduce<ValidationError | undefined>((err, val) => (err || val((target as any)[k])), undefined);
        if (error) {
          return error;
        }
      }
    }
  }
}

// tslint:disable-next-line:no-namespace
declare global {
  export namespace Reflect {
    export function getMetadata<T = any>(key: "ts-express-validator:validators", target: { new(...args: any[]): T }): {[k in keyof T]: Array<ValidatorFunction<T[k]>> | undefined } | undefined;
  }
}

export function functionValidator(fn: ValidatorFunction<any>) {
  return (metaTarget: any, propertyKey: string) => {
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
      Reflect.defineMetadata("ts-express-validator:validators", validators as any, target);
    }
    if (!validators[propertyKey]) {
      validators[propertyKey] = [] as Array<ValidatorFunction<any>>;
    }
    (validators[propertyKey] as any).push(fn);
  };
}

export function isInteger() {
  return functionValidator((val: number) => {
    if (val > (~~val)) {
      return new ValidationError("Expected integer but " + val + " found");
    }
  });
}

export function isGreaterThan(gt: number) {
  return functionValidator((val: number) => {
    if (gt >= val) {
      return new ValidationError("Expected " + val + " to be greater than " + gt);
    }
  });
}

export function isLowerThan(lt: number) {
  return functionValidator((val: number) => {
    if (lt <= val) {
      return new ValidationError("Expected " + val + " to be lower than " + lt);
    }
  });
}

export function isGreaterEqual(ge: number) {
  return functionValidator((val: number) => {
    if (ge > val) {
      return new ValidationError("Expected " + val + " to be greater or equal than " + ge);
    }
  });
}

export function isLowerEqual(lt: number) {
  return functionValidator((val: number) => {
    if (lt < val) {
      return new ValidationError("Expected " + val + " to be lower or equal than " + lt);
    }
  });
}
