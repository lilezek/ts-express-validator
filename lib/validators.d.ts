import "reflect-metadata";
import { ValidatorFunction } from "typescript-son";
declare global  {
    namespace Reflect {
        function getMetadata<T = any>(key: "ts-express-validator:validators", target: {
            new (...args: any[]): T;
        }): {
            [k in keyof T]: Array<ValidatorFunction<T[k]>> | undefined;
        } | undefined;
    }
}
export declare function functionValidator(fn: ValidatorFunction<any>): (metaTarget: any, propertyKey: string) => void;
export declare function isInteger(): (metaTarget: any, propertyKey: string) => void;
export declare function isGreaterThan(gt: number): (metaTarget: any, propertyKey: string) => void;
export declare function isLowerThan(lt: number): (metaTarget: any, propertyKey: string) => void;
export declare function isGreaterEqual(ge: number): (metaTarget: any, propertyKey: string) => void;
export declare function isLowerEqual(lt: number): (metaTarget: any, propertyKey: string) => void;
