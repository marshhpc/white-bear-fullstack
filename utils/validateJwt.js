require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function validateJwt(req, res, next) {
   const accessToken = req.header("x-auth-token");

   if (!accessToken) {
      return res.status(401).json({ auth: "No token provided." });
   }

   try {
      // verify the token
      // if valid, extract the user payload
      const decodedPayload = jwt.verify(
         accessToken,
         process.env.JWT_ACCESS_SECRET
      );
      // assigning the payload to the req
      req.user = decodedPayload;
      // continue on in the api
      next();
   } catch {
      return res.status(401).json({ auth: "Unautherized token" });
   }
};
