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
      .then((users) => {
         console.log(users);
         const user = users[0];
         bcrypt.compare(password, user.password).then((result) => {
            console.log(result);
            return result;
         });
      })
      .catch((err) => {
         console.log(err);
      });
   // compare user password with password
   // if a match, return true, else false
}
