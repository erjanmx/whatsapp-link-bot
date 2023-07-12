const buildWhatsAppLink = require('./build-whatsapp-link');

describe('buildWhatsAppLink', () => {
  it('should build a WhatsApp link with the given phone number', () => {
    const phoneNumber = '+123456789';

    const result = buildWhatsAppLink(phoneNumber);

    expect(result).toEqual('https://wa.me/+123456789');
  });

  it('should handle phone numbers without a leading plus sign', () => {
    const phoneNumber = '123456789';

    const result = buildWhatsAppLink(phoneNumber);

    expect(result).toEqual('https://wa.me/123456789');
  });

  it('should handle phone numbers with spaces', () => {
    const phoneNumber = '123 45 67 89';

    const result = buildWhatsAppLink(phoneNumber);

    expect(result).toEqual('https://wa.me/123456789');
  });
});
