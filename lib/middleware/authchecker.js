const { verify } = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const { token } = req.cookies;

    let verification = verify(token, process.env.JWT_SECRET);

    console.log(verification)

    req.user = verification.id;
    next()
  } catch (error) {
    return res.status(500).json({
      message: error?.message,
      error: true,
    });
  }
};
