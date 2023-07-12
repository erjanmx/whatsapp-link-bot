function buildWhatsAppLink(phoneNumber) {
  const strippedPhoneNumber = phoneNumber.replace(/\s/g, '');
  return `https://wa.me/${strippedPhoneNumber}`;
}

module.exports = buildWhatsAppLink;
