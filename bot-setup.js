const extractPhoneNumbers = require('./extract-phone-numbers');
const buildFullPhoneNumber = require('./build-phone-number');
const buildWhatsAppLink = require('./build-whatsapp-link');

module.exports = function setupBot(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = 'Welcome to the WhatsApp link generator bot! Please send me a number:';
    bot.sendMessage(chatId, message);
  });

  bot.onText(/.*/, (msg) => {
    // Ignore start command here to prevent duplicate responses
    if (msg.text && msg.text.startsWith('/start')) return;

    const chatId = msg.chat.id;
    const extractedNumbers = extractPhoneNumbers(msg.text || '');

    if (extractedNumbers.length < 1) {
      bot.sendMessage(chatId, 'No valid phone numbers found in the text.');
      return;
    }

    const numbers = extractedNumbers.map(number => buildFullPhoneNumber(number)).filter(Number);

    if (numbers.length < 1) {
      bot.sendMessage(chatId, 'No valid phone numbers found in the text.');
      return;
    }

    const options = {
      disable_web_page_preview: true
    };
    const response = [...new Set(numbers)].map(n => buildWhatsAppLink(n)).join('\n');

    bot.sendMessage(chatId, response, options);
  });
};
