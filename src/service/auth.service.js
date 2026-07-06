import { prisma } from "../utils/prisma.js";
import bcrypt from "bcrypt";

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

async function createUser({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error("name, email and password are required");
    err.status = 400;
    throw err;
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    const err = new Error("Email already in use");
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  const { password: _pw, ...userSafe } = user;
  return userSafe;
}

export { createUser, findUserByEmail, comparePassword };
