const mongoose = require("mongoose");
const { createHash } = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    gender: {
      type: Number,
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

UserSchema.pre("save", async function (next) {
  try {
    let user = this;
    let hashing = createHash("sha256")
      .update(user.password, "utf-8")
      .digest("hex");

    user.password = hashing;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
