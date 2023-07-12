function buildFullPhoneNumber(number) {
  if (number.startsWith('+')) {
    return number;
  }
  
  if (number.length > 10) {
    if (number.startsWith('+') == false) {
        number = '+' + number;
      }
      return number;
  }
  
  if (number.length == 10) {
    if (number.startsWith('06')) {  
      // dutch
      return '+31' + number.substring(1);
    } 

    // kyrgyz
    return '+996' + number.substring(1);
  } 
    
  if (number.length == 9 && number.startsWith('0') == false) {  
    // kyrgyz
    return '+996' + number;
  }
  
  return null;
}
  
module.exports = buildFullPhoneNumber;
