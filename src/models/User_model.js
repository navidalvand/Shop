const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 4,
    maxLength: 14,
    required: true,
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  birthDate: { type: Date },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    reuired : true,
    default: "/default-user.jpg",
  },
  role: { type: String, enum: ["ADMIN", "OWNER", "USER"], default: "USER" },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
