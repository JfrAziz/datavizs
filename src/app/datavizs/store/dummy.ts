import { faker } from "@faker-js/faker"

export const createMetadata = (): MetaData => ({
  name: faker.finance.accountName(),
  createdAt: new Date(),
  columns: [
    {
      name: "_id",
      type: "id",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "age",
      type: "number",
    },
    {
      name: "gender",
      type: "string",
    },
  ],
})

export const createData = () =>
  faker.helpers.multiple(
    () => ({
      _id: faker.string.nanoid(10),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 10, max: 70 }),
      gender: faker.person.sex(),
    }),
    { count: 1000 }
  )
