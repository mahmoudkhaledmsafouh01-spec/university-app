import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DB...");

  await prisma.grade.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  const [adminPassword, instructorPassword, studentPassword] = await Promise.all([
    bcrypt.hash("admin123", 10),
    bcrypt.hash("instructor123", 10),
    bcrypt.hash("student123", 10),
  ]);

  const [admin, instructor, student] = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin", 
        password: adminPassword,
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        email: "instructor@example.com",
        name: "Dr. Rivera",
        password: instructorPassword,
        role: "INSTRUCTOR",
      },
    }),
    prisma.user.create({
      data: {
        email: "student@example.com",
        name: "Alex Johnson",
        password: studentPassword,
        role: "STUDENT",
      },
    }),
  ]);

  const [csDepartment, businessDepartment] = await prisma.department.createMany({
    data: [
      { name: "Computer Science" },
      { name: "Business" },
    ],
    skipDuplicates: true,
  }).then(async () => {
    const departments = await prisma.department.findMany();
    return [departments.find((d) => d.name === "Computer Science")!, departments.find((d) => d.name === "Business")!];
  });

  const [algorithms, finance] = await Promise.all([
    prisma.course.create({
      data: {
        title: "Algorithms", 
        code: "CS301",
        credits: 3,
        description: "Design, analyze, and optimize algorithms with real-world examples.",
        departmentId: csDepartment.id,
        instructorId: instructor.id,
        lessons: {
          create: [
            { title: "Greedy strategies", content: "Activity selection and interval scheduling" },
            { title: "Dynamic programming", content: "Knapsack and sequence alignment" },
          ],
        },
        announcements: {
          create: [
            { title: "Project kick-off", message: "Teams and topics finalized." , authorId: instructor.id },
          ],
        },
      },
    }),
    prisma.course.create({
      data: {
        title: "Financial Accounting",
        code: "BUS201",
        credits: 4,
        description: "Core accounting concepts, statements, and decision-making.",
        departmentId: businessDepartment.id,
        instructorId: instructor.id,
      },
    }),
  ]);

  await Promise.all([
    prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId: algorithms.id,
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId: finance.id,
      },
    }),
  ]);

  await prisma.grade.create({
    data: {
      grade: 92,
      type: "EXAM",
      userId: student.id,
      courseId: algorithms.id,
    },
  });

  console.log("✔️ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });