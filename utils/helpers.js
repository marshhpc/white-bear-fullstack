const bcrypt = require("bcrypt");

module.exports = {
   toJson(data) {
      return JSON.stringify(data);
   },

   toSafeParse(str) {
      try {
         JSON.parse(str);
      } catch (err) {
         console.log(err);
         return str;
      }
      return JSON.parse(str);
   },

   toHash(password) {
      const saltRounds = 12;
      return bcrypt.hash(password, saltRounds);
   },
};
