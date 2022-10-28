import dayjs from 'dayjs';

export function getFormattedDateHour(dateHour: string): string {
    const format = 'DD/MM/YYYY HH:mm:ss'
    const formattedDateHour = dayjs(dateHour).format(format);
    return formattedDateHour;
}