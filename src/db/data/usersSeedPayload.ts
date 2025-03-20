import { generateUser } from "../../utils/test/generateUsers.js";

const now = new Date();
//automatically created by seed.ts
export const usersForSeed = Object.freeze({
  member: {
    normal: [
      generateUser(),
      generateUser(),
      generateUser(),
      generateUser(),
      generateUser(),
    ],
    deleted: [
      generateUser({ deletedAt: now }),
      generateUser({ deletedAt: now }),
    ],
    unVerified: [
      generateUser({ verifiedPhone: false }),
      generateUser({ verifiedPhone: false }),
    ],
  },
  //
  admin: {
    normal: [generateUser({ role: "ADMIN" }), generateUser({ role: "ADMIN" })],
    deleted: [
      generateUser({ role: "ADMIN", deletedAt: now }),
      generateUser({ role: "ADMIN", deletedAt: now }),
    ],
    unVerified: [
      generateUser({ role: "ADMIN", verifiedPhone: false }),
      generateUser({ role: "ADMIN", verifiedPhone: false }),
    ],
  },
});

//used to create users inside automation test:
//await db.insertInto("User").values(testUsers.members.deleted).execute();
export const testUsers = Object.freeze({
  member: {
    normal: [
      {
        role: "MEMBER",
        id: "9c003c40-5b95-4220-a42e-c3315f2df3be",
        phone: "+9647881000000",
        firstName: "Omar",
        secondName: "Khalid",
        thirdName: "Hassan1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic0@gmail.com",
        image: "https://placehold.co/100x100/333333/999999/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
      {
        role: "MEMBER",
        id: "61591bf8-79af-4102-8532-0051b76a8489",
        phone: "+9647881000001",
        firstName: "Ali",
        secondName: "Fahad",
        thirdName: "Yousef1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic1@gmail.com",
        image: "https://placehold.co/100x100/FF5733/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
      {
        role: "MEMBER",
        id: "b5f1dd27-5b39-4d25-89e2-368821b59bf4",
        phone: "+9647881000002",
        firstName: "Zaid",
        secondName: "Mohammed",
        thirdName: "Salim1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic2@gmail.com",
        image: "https://placehold.co/100x100/4CAF50/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
    ],
    deleted: [
      {
        role: "MEMBER",
        id: "44e1c370-7140-46e8-9f87-32c24026e61d",
        phone: "+9647881000003",
        firstName: "Hassan",
        secondName: "Nasser",
        thirdName: "Ibrahim1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic3@gmail.com",
        image: "https://placehold.co/100x100/2196F3/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: "2025-03-04T11:21:41.475Z",
      },
      {
        role: "MEMBER",
        id: "33905bbb-6a89-4484-a21b-3828990c3219",
        phone: "+9647881000004",
        firstName: "Rami",
        secondName: "Tariq",
        thirdName: "Jamal1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic4@gmail.com",
        image: "https://placehold.co/100x100/9C27B0/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: "2025-03-04T11:21:41.475Z",
      },
    ],
    unVerified: [
      {
        role: "MEMBER",
        id: "86cb08d5-3174-4992-964e-c07b9463ae0f",
        phone: "+9647881000005",
        firstName: "Aisha",
        secondName: "Adnan",
        thirdName: "Faris1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic5@gmail.com",
        image: "https://placehold.co/100x100/E91E63/FFFFFF/png",
        verifiedPhone: false,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
      {
        role: "MEMBER",
        id: "b272273a-6f14-4fd7-b12f-2a75b599ea10",
        phone: "+9647881000006",
        firstName: "Kareem",
        secondName: "Sami",
        thirdName: "Raheem1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic6@gmail.com",
        image: "https://placehold.co/100x100/FFEB3B/333333/png",
        verifiedPhone: false,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
    ],
  },
  admin: {
    normal: [
      {
        role: "ADMIN",
        id: "075d6b58-2260-42a3-b31e-e00b0e5fd290",
        phone: "+9647881000007",
        firstName: "Layla",
        secondName: "Zubair",
        thirdName: "Rashid1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic7@gmail.com",
        image: "https://placehold.co/100x100/FFC107/333333/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
      {
        role: "ADMIN",
        id: "f21b51be-ade0-438d-bef5-495ede97e013",
        phone: "+9647881000008",
        firstName: "Bilal",
        secondName: "Sameer",
        thirdName: "Hakeem1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic8@gmail.com",
        image: "https://placehold.co/100x100/673AB7/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
    ],
    deleted: [
      {
        role: "ADMIN",
        id: "44240dc1-a9e9-4f00-8f10-3f7350d72c83",
        phone: "+9647881000009",
        firstName: "Yasin",
        secondName: "Amjad",
        thirdName: "Mustafa1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic9@gmail.com",
        image: "https://placehold.co/100x100/607D8B/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: "2025-03-04T11:21:41.475Z",
      },
      {
        role: "ADMIN",
        id: "a129064e-b9e6-45d4-9572-318b6acc956d",
        phone: "+9647881000010",
        firstName: "Jalal",
        secondName: "Salah",
        thirdName: "Nadim1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic10@gmail.com",
        image: "https://placehold.co/100x100/8BC34A/FFFFFF/png",
        verifiedPhone: true,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: "2025-03-04T11:21:41.475Z",
      },
    ],
    unVerified: [
      {
        role: "ADMIN",
        id: "81db8675-10cf-4835-b513-39aaff7f0cbb",
        phone: "+9647881000011",
        firstName: "Hana",
        secondName: "Saif",
        thirdName: "Mahmoud1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic11@gmail.com",
        image: "https://placehold.co/100x100/795548/FFFFFF/png",
        verifiedPhone: false,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
      {
        role: "ADMIN",
        id: "043c9dc3-b0ff-4a45-8fd5-5b779fc09fc0",
        phone: "+9647881000012",
        firstName: "Tamer",
        secondName: "Zain",
        thirdName: "Othman1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU",
        email: "testStatic12@gmail.com",
        image: "https://placehold.co/100x100/00BCD4/FFFFFF/png",
        verifiedPhone: false,
        createdAt: "2025-03-04T11:21:41.475Z",
        updatedAt: "2025-03-04T11:21:41.475Z",
        deletedAt: null,
      },
    ],
  },
});
