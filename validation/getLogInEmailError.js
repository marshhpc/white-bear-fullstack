const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = function getLoginEmailError(email) {
   if (email === "") {
      return "Please enter you email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address.";
   }
   return "";
};
