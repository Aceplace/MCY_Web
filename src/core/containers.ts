export function ShuffleArray<T>(array: T[]): T[]
{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index 0..i
        [array[i], array[j]] = [array[j], array[i]];  // swap elements
    }
    return array;
}

export function PopArrayElements<t>(arr: t[], popCount: number)
{
    ShuffleArray(arr);
    for (let i = 1; i <= popCount; i++)
        arr.pop();
}
