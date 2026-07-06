import { createUser as createUserService } from "../service/auth.service.js";

const createUser = async (req, res) => {
  try {
    const userSafe = await createUserService(req.body);
    res.status(201).json(userSafe);
  } catch (error) {
    console.error("Error creating user:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Failed to create user" });
  }
};

export { createUser };