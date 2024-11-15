import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const shifts = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed month

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const start = new Date(year, month, day, 9, 0); // Start at 9 AM
    const end: Date = new Date(year, month, day, 17, 0); // End at 5 PM

    shifts.push({
      title: `Shift for Day ${day}`,
      start: start,
      end: end,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
      approved: false,
    });
  }

  for (const shift of shifts) {
    await prisma.shift.create({
      data: shift,
    });
  }

  console.log("Fake data seeded successfully for the current month!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
