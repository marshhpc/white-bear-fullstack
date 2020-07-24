function checkIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}

const Max_Card_Chars = 240;
// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { checkIsOver, Max_Card_Chars, EMAIL_REGEX };
