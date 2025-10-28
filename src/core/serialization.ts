import {MyAssert} from "./error";

export function CopyBuffer(src: ArrayBuffer, dest: ArrayBuffer, offset: number): number
{
    const srcView = new Uint8Array(src);
    const destView = new Uint8Array(dest);

    destView.set(srcView, offset);
    return srcView.length;
}

export function SizeStringToArrayBuffer_Small(str: string): number
{
    const encoder = new TextEncoder(); // UTF-8 encoder
    const encoded = encoder.encode(str); // Uint8Array with bytes of str (ASCII-safe)

    MyAssert(encoded.length < 255, "String too long (max 255 chars)");

    return 1 + encoded.length;
}

export function SizeStringToArrayBuffer_Large(str: string): number
{
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);

    MyAssert(encoded.length < 65535, "String too long (max 65535 bytes)");

    return 2 + encoded.length; // 2 bytes for length + string bytes
}

export function StringToArrayBuffer_Small(str: string): ArrayBuffer
{
    const encoder = new TextEncoder(); // UTF-8 encoder
    const encoded = encoder.encode(str); // Uint8Array with bytes of str (ASCII-safe)

    MyAssert(encoded.length < 255, "String too long (max 255 chars)");

    // +1 for the length byte
    const buffer = new ArrayBuffer(1 + encoded.length);
    const view = new Uint8Array(buffer);

    view[0] = encoded.length;            // first byte = string length
    view.set(encoded, 1);                // copy string bytes after length

    return buffer;
}

export function StringToArrayBuffer_Large(str: string): ArrayBuffer
{
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);

    MyAssert(encoded.length < 65535, "String too long (max 65535 bytes)");

    const buffer = new ArrayBuffer(2 + encoded.length);
    const view = new Uint8Array(buffer);

    // Store length in first 2 bytes (big-endian)
    view[0] = (encoded.length >> 8) & 0xFF; // high byte
    view[1] = encoded.length & 0xFF;        // low byte

    view.set(encoded, 2); // copy string bytes after length

    return buffer;
}

export function ArrayBufferToString_Small(buffer: ArrayBuffer, offset: number = 0): [string, number]
{
    const view = new Uint8Array(buffer, offset);
    const length = view[0];              // first byte = length
    const encoded = view.slice(1, 1 + length); // extract string bytes

    const decoder = new TextDecoder();
    return [decoder.decode(encoded), length + 1];
}

export function ArrayBufferToString_Large(buffer: ArrayBuffer, offset: number = 0): [string, number]
{
    const view = new Uint8Array(buffer, offset);
    const length = (view[0] << 8) | view[1];
    const encoded = view.slice(2, 2 + length);

    const decoder = new TextDecoder();
    return [decoder.decode(encoded), length + 2];
}

export function ArrayBufferToBase64String(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary); // base64 encode
}

export function Base64StringToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64); // base64 decode
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}