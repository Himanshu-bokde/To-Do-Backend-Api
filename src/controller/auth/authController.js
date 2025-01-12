const User = require("../../models/userModel");
const jwtService = require("../../services/jwtService");
const logger = require("../../utils/logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email); // Use Mongoose method
    if (!user) {
      logger.warn(`Login attempt failed for email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.verifyPassword(password); // Compare passwords securely
    if (!isPasswordValid) {
      logger.warn(`Invalid credentials for email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwtService.generateToken({ id: user._id, email: user.email });
    logger.info(`User ${email} logged in successfully`);
    res.json({ token, id: user._id, name: user.name });
  } catch (error) {
    logger.error(`Error in login: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.getUserByEmail(email)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.createUser({ name, email, password }); // Mongoose create method
    const token = jwtService.generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    logger.info(`User ${email} registered successfully`);
    res.status(201).json({ token, id: newUser._id, name: newUser.name });
  } catch (error) {
    logger.error(`Error in register: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, register };
