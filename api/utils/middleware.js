const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
require("dotenv").config();

module.exports = class Middleware {
  checkToken = (req, res, next) => {
    try {
      let token = req?.headers["authorization"]?.split("Bearer ")[1];
      let checker = this.#isValidToken(token);
      if (checker) {
        return Promise.resolve(next());
      }
      return res.status(400).json({
         status: 400,
         message: "invalid Token"
      })
    } catch (error) {
      return Promise.reject(next(error));
    }
  };

  #isValidToken = (token) => {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded?.exp > currentTime;
  };
};
