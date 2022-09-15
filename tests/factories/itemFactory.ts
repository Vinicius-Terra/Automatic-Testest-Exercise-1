import { faker } from '@faker-js/faker';

export default function itemFactory() {
  return {
    title: faker.commerce.product(),
    url: faker.internet.url(),
    description: faker.lorem.paragraph(1),
    amount: Math.round(Number(faker.finance.amount())),
  };
}