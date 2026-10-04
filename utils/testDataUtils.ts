import { addDays, format } from 'date-fns';
import { faker } from '@faker-js/faker';

export function getCurrentDate(): Date {
    return new Date();
}

export function generateRandomFutureDate(maxYears: number): Date {
    return faker.date.future({ years: maxYears });
}

export function addDaysToDate(date: Date, daysToAdd: number): Date {
    return addDays(date, daysToAdd);
}

export function formatDate(date: Date): string {
    return format(date, 'dd-MM-yyyy');
}

export function generateRandomAlphanumericString(numberOfCharacters: number): string {
    return faker.string.alphanumeric(numberOfCharacters);
}