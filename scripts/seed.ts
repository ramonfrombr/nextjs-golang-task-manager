const { faker } = require("@faker-js/faker");
const dayjs = require("dayjs");

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  try {
    Array(10)
      .fill(0)
      .map(async (_, i) => {
        await database.task.create({
          data: {
            name: faker.lorem.sentence().substring(0, 49),
            description: faker.lorem.paragraph().substring(0, 499),
            status: ["NEW", "IN_PROGRESS", "COMPLETED"][
              Math.floor(Math.random() * 3)
            ],
            priority: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)],
            dueDate: new Date(
              randomIntFromInterval(2024, 2024),
              randomIntFromInterval(7, 7),
              randomIntFromInterval(23, 28)
            ),
          },
        });
      });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
