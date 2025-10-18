export function CopyBuffer(src: ArrayBuffer, dest: ArrayBuffer, offset: number): number
{
    const srcView = new Uint8Array(src);
    const destView = new Uint8Array(dest);

    destView.set(srcView, offset);
    return srcView.length;
}