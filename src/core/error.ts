export function MyAssert(conditionMet: boolean, message: string)
{
    if (!conditionMet) {
        alert("Assertion failure");
        debugger;
        throw new Error(message);
    }
}

export function ConvertAssertValue<T>(param: any): T
{
    const value = param as T;
    if (!value) throw new Error("Invalid parameter");
    return value;
}

export class ParseException extends Error
{
    constructor(message: string) {
        super(message);
        this.name = "ParseException";
    }
}
