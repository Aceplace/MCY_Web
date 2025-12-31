export type V2 = {
    x: number;
    y: number;
}

export function V2Clone(other: V2): V2
{
    return { x: other.x, y: other.y};
}

export function V2Add(v1: V2, v2: V2): V2
{
    return { x: v1.x + v2.x, y: v1.y + v2.y};
}

export function V2WithX(v2: V2)
{
    return { x: v2.x, y: 0};
}

export function V2WithY(v2: V2)
{
    return { x: 0, y: v2.y };
}

export function ParseNumberStrict(str: string): number
{
    str = str.trim();

    const value = Number(str);
    if (isNaN(value))
        throw new Error(`${str} is not a number`);

    return value;
}

export function GetRandomBool(): boolean
{
    return Math.random() < 0.5;
}

export function GetRandomBoolWeighted(weight: number): boolean
{
    return Math.random() < weight;
}

export function GetRandomInt(min: number, max: number): number
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetRandomIntWithAbsoluteValue(min: number, max: number): number
{
    let result: number;
    if (GetRandomBool())
        result = GetRandomInt(min, max);
    else
        result = GetRandomInt(-max, -min);

    return result;
}

export function V2ToString(value: V2)
{
    let result = `(${value.x}, ${value.y})`;
    return result;
}