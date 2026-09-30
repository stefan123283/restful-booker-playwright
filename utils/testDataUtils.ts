import { addDays, format } from 'date-fns';
import { faker } from '@faker-js/faker';

export function addDaysToCurrentDate(daysToAdd: number): string {
    const currentDate: Date = new Date();
    const updatedDate: Date = addDays(currentDate, daysToAdd);
    return format(updatedDate, 'dd-MM-yyyy');
}

export function generateRandomAlphanumericString(numberOfCharacters: number): string {
    return faker.string.alphanumeric(numberOfCharacters);
}