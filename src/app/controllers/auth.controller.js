const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const logProvider = require("../middlewares/logprovider");

const getUsersByCredentials = async (req, res) => {
  logProvider.info("Start getUsersByCredentials in auth.controller.js");

  const { userName, password } = req.body;
  const result = await authService.getUsersByCredentials(userName, password);

  if (result.length > 0) {
    logProvider.info("Loggin successful", result);
    const token = jwt.sign({ username: userName }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.status(200).json({
      token: token,
      username: userName,
      expiration: process.env.TOKEN_EXPIRATION,
    });
  } else {
    logProvider.info("Loggin failed", result);
    return res.status(401).send({ error: "Unauthorized user" });
  }
};

module.exports = { getUsersByCredentials };
