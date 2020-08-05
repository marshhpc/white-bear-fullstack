module.exports = function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (checkHasLocalPart(password, email)) {
      return "For you safety, your password cannot contain you email address.";
   }
   const uniqChars = [...new Set(password)];
   if (uniqChars.length < 3) {
      return "For you safety, your password most contain at least 3 unique characters.";
   }
   return "";
};

function checkHasLocalPart(password, email) {
   const localPart = email.split("@")[0];
   if (localPart === "") return false;
   else if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
