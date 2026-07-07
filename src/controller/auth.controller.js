import { createUser as createUserService } from "../service/auth.service.js";
import { loginUser as loginUserService } from "../service/auth.service.js";
import { logoutUser as logoutUserService } from "../service/auth.service.js";

//Create a new user
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


//Login user controller
const loginUser = async (req, res) => {
  try {
    const userSafe = await loginUserService(req.body);
    res.status(200).json(userSafe);
  } catch (error) {
    console.error("Error logging in user:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Failed to login user" });
  }
};

//Logout user controller
const logoutUser = async (req, res) => {
  try {
    const result = await logoutUserService(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logging out user:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Failed to logout user" });
  }
}

// Export the controller functions
export { createUser, loginUser, logoutUser };