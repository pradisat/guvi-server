const { Router } = require("express");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const userroutes = Router();

userroutes.get("/profile", async function (req, res) {
  const response = await User.findById({
    _id: req.user,
  });

  return res.status(200).json({
    message: "okay",
    data: response,
    error: false,
  });
});
userroutes.put("/profile", async function (req, res) {
  const { name, mobile, age, dob, gender } = req.body;

  const response = await User.findOneAndUpdate(
    { _id: new ObjectId(req.user) },
    { name, mobile, age, dob, gender }
  );

  if (!response) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User updated successfully", user: response });
});

module.exports = userroutes;
