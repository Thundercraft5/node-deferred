/// <reference types="node" />
export declare const DeferredError: {
    new <Code extends "DEFERRED_ALREADY_COMPLETE" | "REJECTION_REASON_NOT_ERROR">(code: Code, ...formats: Required<Parameters<Exclude<{
        DEFERRED_ALREADY_COMPLETE: (id: number) => string;
        REJECTION_REASON_NOT_ERROR: (value: any) => string;
    }[Code], string>>>): {
        "__#1@#message": string;
        readonly "$$<Symbol>codedError": true;
        readonly "$$<Symbol>code": string;
        readonly "$$<Symbol>rawMessage": string;
        readonly name: string;
        message: string;
        getErrorName(): string | undefined;
        stack?: string | undefined;
        cause?: Error | undefined;
        readonly [Symbol.species]: {
            new (message?: string | undefined): {
                name: string;
                message: string;
                stack?: string;
                cause?: Error;
            };
            new (message?: string | undefined, options?: ErrorOptions | undefined): {
                name: string;
                message: string;
                stack?: string;
                cause?: Error;
            };
            captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
            prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
            stackTraceLimit: number;
        };
        readonly [Symbol.toStringTag]: string | undefined;
    };
    readonly "$$<Symbol>codedErrorClass": boolean;
    [Symbol.hasInstance](instance: any): boolean;
} & {
    new (message?: string | undefined): {
        name: string;
        message: string;
        stack?: string;
        cause?: Error;
    };
    new (message?: string | undefined, options?: ErrorOptions | undefined): {
        name: string;
        message: string;
        stack?: string;
        cause?: Error;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
//# sourceMappingURL=errors.d.ts.map