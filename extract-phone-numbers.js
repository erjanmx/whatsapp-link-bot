function extractPhoneNumbers(text) {
  // Regular expression pattern for phone number extraction
  const phoneRegex = /(\+?[0-9]{1,3}([-\s]*[0-9]{1,2}){1,}[0-9]{1,14})/g;

  const matches = text.match(phoneRegex) || [];

  return matches.map(match => match.replace(/[^\d+]+/g, ''));
}

module.exports = extractPhoneNumbers;
