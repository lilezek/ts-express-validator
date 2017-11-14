export declare class LoginRequest {
    __metadataDummyMethod(): void;
    login: string;
    password: string;
    isMobile?: boolean;
    isValid(): boolean;
}
export declare class SetAge {
    __metadataDummyMethod(): void;
    age: number;
}
export declare const afterListen: Promise<{}>;
