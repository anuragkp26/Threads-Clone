import { faker } from "@faker-js/faker";

import { Thread, User } from "../models/threads";

export const createRandomFollower = (): User => {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName() + " " + faker.person.lastName(),
    username: faker.internet.userName(),
    verified: Math.random() >= 0.5,
    photo: faker.image.avatar(),
    bio: faker.person.bio(),
    link: faker.internet.url(),
  };
};

export const createRandomUser = (): User => {
  
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName() + " " + faker.person.lastName(),
    username: faker.internet.userName(),
    verified: Math.random() >= 0.5,
    photo: faker.image.avatar(),
    bio: faker.person.bio(),
    link: faker.internet.url(),
    followers: new Array(Math.floor(Math.random() * 10))
      .fill(null)
      .map((_) => createRandomFollower()),
  };
};

export const createRandomThread = (): Thread => {
  const author = createRandomUser();
  const mentionUser = createRandomUser();

  return {
    id: faker.string.uuid(),
    author: author,
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
    replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => ({
      id: faker.string.uuid(),
      author: createRandomUser(),
      content: faker.lorem.sentence(),
      likes: Math.floor(Math.random() * 1000),
      createdAt: faker.date.recent().toISOString(),
    })),
    repliesCount: Math.floor(Math.random() * 100),
    likesCount: Math.floor(Math.random() * 1000),
    mention: Math.random() > 0.5,
    mentionUser: mentionUser,
    createdAt: faker.date.recent().toISOString(),
  };
};

export const generateThreadList = (): Thread[] => {
    return new Array(50).fill(null).map((_) => createRandomThread())
}
