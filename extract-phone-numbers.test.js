const extractPhoneNumbers = require('./extract-phone-numbers');

describe('extractPhoneNumbers', () => {
  it('should extract phone numbers from text', () => {
    const text = 'I have two phone numbers: +123456789 and 987-654-321.';

    const result = extractPhoneNumbers(text);

    expect(result).toEqual(['+123456789', '987654321']);
  });

  it('should handle no phone numbers in text', () => {
    const text = 'This is a sample text without any phone numbers.';

    const result = extractPhoneNumbers(text);

    expect(result).toEqual([]);
  });

  it('should extract phone numbers with different formats', () => {
    const text = 'Phone numbers: +1 123 456 789, 0123-45-67-89, +44 987654321';

    const result = extractPhoneNumbers(text);

    expect(result).toEqual(['+1123456789', '0123456789', '+44987654321']);
  });

  it('should handle repeated phone numbers in text', () => {
    const text = 'Call me at +123456789 or +123456789.';

    const result = extractPhoneNumbers(text);

    expect(result).toEqual(['+123456789', '+123456789']);
  });
});
