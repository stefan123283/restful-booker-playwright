import { addDays, format } from 'date-fns';

export function addDaysToCurrentDate(daysToAdd: number): string {
    const currentDate: Date = new Date();
    const updatedDate: Date = addDays(currentDate, daysToAdd);
    return format(updatedDate, 'dd-MM-yyyy');
} 