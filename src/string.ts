export function HashStringToInt(str: string): number {
    let hash = 0x811c9dc5; // FNV offset basis
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193); // FNV prime
    }
    return hash >>> 0; // force unsigned 32-bit
}

export function EscapeRegex(str: string): string
{
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class ParseException extends Error
{
    constructor(message: string) {
        super(message);
        this.name = "ParseException";
    }
}

export class DrawingException extends Error
{
    constructor(message: string) {
        super(message);
        this.name = "DrawException";
    }
}

export function CharIsAlphanumeric(char: string): boolean
{
    if (char.length > 1)
        return false;
    const code = char.charCodeAt(0);
    return (code >= 48 && code <= 57) ||  // 0-9
        (code >= 65 && code <= 90) ||  // A-Z
        (code >= 97 && code <= 122);   // a-z
}

export function IsHexDigit(char: string): boolean {
    return /^[0-9a-fA-F]$/.test(char);
}

export function IsValidHexColorString(str: string): boolean {
    return /^[0-9a-fA-F]{6}$/.test(str);
}

export function ExtractHexColor(str: string): string | undefined {
    if (IsValidHexColorString(str)) {
        return `#${str}`;
    }
    return undefined;
}

export function HexDigitToNumber(char: string): number | undefined {
    if (/^[0-9a-fA-F]$/.test(char)) {
        return parseInt(char, 16);
    }
    return undefined;
}