exports.validateMobileNumber = function (mobile) {
    var num = parseInt(mobile);
    var s = 0;
    while(num > 0) {
        s += 1;
        num = Math.floor(num/10);
    }
    if(s == 10)
        return true;
    return false;
};

exports.validateEmail = function (email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {

    return true;

  } 
  return false;

};