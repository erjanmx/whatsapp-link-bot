const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const extractPhoneNumbers = require('./extract-phone-numbers');
const buildFullPhoneNumber = require('./build-phone-number');
const buildWhatsAppLink = require('./build-whatsapp-link');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = 'Welcome to the WhatsApp link generator bot! Please send me a number:';

  bot.sendMessage(chatId, message);
});

bot.onText(/.*/, (msg) => {
  const chatId = msg.chat.id;
  const extractedNumbers = extractPhoneNumbers(msg.text);

  if (extractedNumbers.length < 0) {
    bot.sendMessage(chatId, 'No phone numbers found in the text.');
    return
  }

  const numbers = extractedNumbers.map(number => buildFullPhoneNumber(number)).filter(Number);

  if (numbers.length < 1) {
    bot.sendMessage(chatId, 'No valid phone numbers found in the text.');
    return
  }

  const options = {
    disable_web_page_preview: true
  };
  const response = [ ...new Set(numbers)].map(n => buildWhatsAppLink(n)).join('\n')

  bot.sendMessage(chatId, response, options);
});
