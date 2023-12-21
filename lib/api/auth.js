const { Router } = require("express");
const User = require("../models/user.model");
const generateHash = require("../utils/generateHash");
const generateToken = require("../utils/generateToken");
const { verify } = require("jsonwebtoken");

const authroutes = Router();

authroutes.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;

    let query_response = await User.findOne({
      email,
    });

    if (!query_response) {
      return res.status(404).json({
        message: "User not exists",
        statuscode: 404,
        error: true,
      });
    }

    if (query_response.password != generateHash(password)) {
      return res.status(401).json({
        message: "Invalid password",
        statuscode: 401,
        error: true,
      });
    }

    let createToken = generateToken({ id: query_response._id });

    return res
      .status(200)
      .cookie("token", generateToken({ id: query_response._id }), {
        maxAge: Number.parseInt(process.env.JWT_EXPIRE),
      })
      .json({
        message: "success",
        token: createToken,
        statuscode: 200,
        error: false,
      });
  } catch (error) {
    return res.status(500).json({
      message: error?.message,
      error: false,
      statuscode: 500,
    });
  }
});

authroutes.post("/signup", async function (req, res) {
  try {
    const { name, email, new_password, confirm_password } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Please check all fields",
        error: true,
        statuscode: 400,
      });
    }
    let checkIfUserEixts = await User.findOne({
      email,
    });
    if (checkIfUserEixts) {
      return res.status(400).json({
        message: "Email already exists",
        statuscode: 400,
        error: true,
      });
    }
    let insertuser = await new User({
      name,
      email,
      password: new_password,
    }).save();

    return res.status(201).json({
      message: "Created Sucessfully",
      data: {
        _id: insertuser._id,
      },
      error: false,
      statuscode: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message,
      error: true,
      statuscode: 500,
    });
  }
});

authroutes.get("/validate", async function (req, res) {
  try {
    const { token } = req.cookies;
    let verification = verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "okay",
      data: verification._id,
      statuscode: 200,
      error: false,
    });
  } catch (error) {
    return res.clearCookie("token").status(500).json({
      message: error?.message,
      statuscode: 500,
      error: true,
    });
  }
});

authroutes.get("/logout", async function (req, res) {
  return res.clearCookie("token").end();
});

module.exports = authroutes;
