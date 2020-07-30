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
      const saltRounds = 11;
      bcrypt.hash(password, saltRounds, (err, hash) => {
         if (err) {
            console.log(err);
         } else {
            console.log(hash);
            return hash;
         }
      });
   },
};
