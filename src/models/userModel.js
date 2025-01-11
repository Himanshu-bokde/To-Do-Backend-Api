const mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/hashUtils");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// **Middleware: Hash password before saving**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

// **Model Methods**
userSchema.statics.getUserByEmail = async function (email) {
  return await this.findOne({ email });
};

userSchema.statics.createUser = async function ({ name, email, password }) {
  const newUser = new this({ name, email, password });
  return await newUser.save();
};

userSchema.methods.verifyPassword = async function (inputPassword) {
  return await comparePassword(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
