const { EMAIL_REGEX } = require("../utils/helpers");
const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");

module.exports = async function getSignUpEmailError(email) {
   if (email === "") {
      return "Please enter you email address.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email address.";
   }
   if (await checkIsInDb(email)) {
      return "This email address already exists in the database.";
   }
   return "";
};

function checkIsInDb(email) {
   return db
      .query(selectUserByEmail, email)
      .then((users) => {
         if (users.length === 0) return false;
         else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
