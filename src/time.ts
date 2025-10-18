export const MILLISECONDS_PER_MINUTE: number = 60 * 1000;

const showDateOption: Intl.DateTimeFormatOptions =
{
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
}

export function IsPastTimeMinutes(minutes: number, checkTime: number)
{
    const result: boolean = Date.now() - checkTime >= minutes * MILLISECONDS_PER_MINUTE;
    return result;
}

export function DateAsString(time: number) : string
{
    const date = new Date(time);
    return `${date.toLocaleString('en-US', showDateOption)}`;
}


export function DayString(time: number): string
{
    const date = new Date(time);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year} ${month} ${day}`;
}




