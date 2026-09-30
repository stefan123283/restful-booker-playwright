import { faker } from '@faker-js/faker';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export function createRandomUser(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phoneNumber = faker.phone.number({ style: 'international' });

    return {
        firstName,
        lastName,
        email,
        phoneNumber,
    };
}
