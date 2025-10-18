export function MyAssert(conditionMet: boolean, message: string) {
    if (!conditionMet) {
        alert("Assertion failure");
        debugger;
        throw new Error(message);
    }
}

export function ConvertAssertValue<T>(param: any): T {
    const value = param as T;
    if (!value) throw new Error("Invalid parameter");
    return value;
}


