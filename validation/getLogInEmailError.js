const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = async function getLoginEmailError(email) {
   if (email === "") {
      return "Please enter you email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address.";
   }
   return "";
};
