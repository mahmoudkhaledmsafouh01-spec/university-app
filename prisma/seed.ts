import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DB...");

 await prisma.$transaction([
    prisma.grade.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.enrollment.deleteMany(),
    prisma.course.deleteMany(),
    prisma.department.deleteMany(),
    prisma.user.deleteMany(),
  ]);
 const [adminPassword, instructorPassword, studentPassword] = await Promise.all([
    bcrypt.hash("admin123", 10),
    bcrypt.hash("teach123", 10),
    bcrypt.hash("student123", 10),
  ]);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const instructor = await prisma.user.create({
    data: {
      email: "instructor@example.com",
      name: "Alex Instructor",
      password: instructorPassword,
      role: Role.INSTRUCTOR,
    },
  });

  const student = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: "Sam Student",
      password: studentPassword,
      role: Role.STUDENT,
    },
  });

  const [engineering, mathematics, humanities] = await Promise.all([
    prisma.department.create({ data: { name: "Computer Science" } }),
    prisma.department.create({ data: { name: "Mathematics" } }),
    prisma.department.create({ data: { name: "Literature" } }),
  ]);

  const csCourse = await prisma.course.create({
    data: {
      title: "Introduction to Algorithms",
      code: "CS201",
      credits: 4,
      description: "Core data structures, algorithm analysis, and problem solving.",
      departmentId: engineering.id,
      instructorId: instructor.id,
    },
  });

  const mathCourse = await prisma.course.create({
    data: {
      title: "Calculus II",
      code: "MATH202",
      credits: 3,
      description: "Integrals, series, and applications for science and engineering.",
      departmentId: mathematics.id,
      instructorId: instructor.id,
    },
  });

  const litCourse = await prisma.course.create({
    data: {
      title: "Modern Literature",
      code: "LIT150",
      credits: 2,
      description: "Survey of 20th century authors, themes, and critical analysis.",
      departmentId: humanities.id,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "Algorithmic Complexity",
        content: "Big O notation, best/worst case, and amortized analysis.",
        courseId: csCourse.id,
      },
      {
        title: "Sorting and Searching",
        content: "Implement and compare classic sorting and searching algorithms.",
        courseId: csCourse.id,
      },
      {
        title: "Series and Convergence",
        content: "Infinite series, convergence tests, and Taylor series.",
        courseId: mathCourse.id,
      },
    ],
  });

  await prisma.enrollment.createMany({
    data: [
      { studentId: student.id, courseId: csCourse.id },
      { studentId: student.id, courseId: mathCourse.id },
    ],
  });

  await prisma.grade.createMany({
    data: [
      { userId: student.id, courseId: csCourse.id, grade: 92, type: "EXAM" },
      { userId: student.id, courseId: mathCourse.id, grade: 88, type: "PROJECT" },
    ],
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "Midterm schedule",
        message: "Midterm exam will be held next Wednesday in Lab 3.",
        courseId: csCourse.id,
        authorId: instructor.id,
      },
      {
        title: "Homework 3 posted",
        message: "Please submit the series worksheet by Friday at 5 PM.",
        courseId: mathCourse.id,
        authorId: instructor.id,
      },
    ],
  });

  console.log("✔️ Seed completed!", {
    admin: admin.email,
    instructor: instructor.email,
    student: student.email,
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
