const buildFullPhoneNumber = require('./build-phone-number');

test('0612345678 => +31612345678', () => {
  expect(buildFullPhoneNumber('0612345678')).toBe('+31612345678');
});

test('0700123456 => +996700123456', () => {
  expect(buildFullPhoneNumber('0700123456')).toBe('+996700123456');
});

test('555123456 => +996555123456', () => {
  expect(buildFullPhoneNumber('555123456')).toBe('+996555123456');
});

test('996999123456 => +996999123456', () => {
  expect(buildFullPhoneNumber('996999123456')).toBe('+996999123456');
});

test('+172710203040 => +172710203040', () => {
  expect(buildFullPhoneNumber('172710203040')).toBe('+172710203040');
});
