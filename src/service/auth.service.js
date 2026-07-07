import { prisma } from "../utils/prisma.js";
import bcrypt from "bcrypt";

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

//Create a new user in the database
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

//Login user by checking email and password
async function loginUser({ email, password }) {
  if(!email || !password){
    const err = new Error("Eamil or Password is required");
    err.status = 400;
    throw err;
  }

  const user = await findUserByEmail(email);
  if(!user){
    const err = new Error("Invaild Email or Password")
    err.status =  401;
    throw err;
  }

  const isMatch = await comparePassword(password, user.password);
  if(!isMatch){
    const err = new Error("Invaild Email or Password")
    err.status= 400;
    throw err;
  }
  const { password: _pw, ...userSafe } = user;
  return userSafe;

}


//Logout user by clearing the session or token (if applicable)
async function logoutUser() {

  // Implement logout logic if using sessions or tokens
  return { message: "User logged out successfully" };
}

export { createUser, findUserByEmail, comparePassword, loginUser, logoutUser };