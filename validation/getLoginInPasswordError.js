const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = async function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please enter your password.";
   }
   if ((await checkIsValidUser(email, password)) === false) {
      return "The email and password combination you have enetered is invalid.";
   }
   return "";
};

function checkIsValidUser(email, password) {
   return db
      .query(selectUserByEmail, email)
      .then(async (users) => {
         const user = users[0];
         const isValidUser = await bcrypt
            .compare(password, user.password)
            .then((isValidUser) => {
               console.log(isValidUser);
               return isValidUser;
            })
            .catch((err) => {
               console.log(err);
            });
         return isValidUser;
      })
      .catch((err) => {
         return false;
      });
   // compare user password with password
   // if a match, return true, else false
}
